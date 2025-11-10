import React, { useEffect, useState } from "react";
import { Car } from "lucide-react";
// import "react-datepicker/dist/react-datepicker.css";
import useVehicle from "../../hooks/useVehicle";
import useBrand from "../../hooks/useBrand";
import useCompany from "../../hooks/useCompany";

const AddVehicleCompany = () => {
  const { getVehicleByBrand, loading } = useVehicle();
  const { getBrands } = useBrand();
  const { createCompanyVehicle } = useCompany();

  const [brandsData, setBrandsData] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [vehicleData, setVehicleData] = useState({
    brandId: "",
    brand: "",
    modelId: "",
    modelName: "",
    connector: "",
    batteryCapacity: "",
    licensePlate: "",
  });

  // Load danh sách hãng xe
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await getBrands();
        console.log("Danh sách hãng:", res);
        if (res) {
          setBrandsData(res);
        }
      } catch (e) {
        console.error("Lỗi khi tải brands:", e);
      }
    };
    fetchBrands();
  }, []);

  // Cập nhật giá trị trong state vehicleData
  const handleChange = (field, value) => {
    setVehicleData((prev) => ({ ...prev, [field]: value }));
  };

  // Khi chọn hãng -> gọi API lấy danh sách model
  const handleBrandChange = async (e) => {
    const brandId = e.target.value;
    const brandObj = brandsData.find(
      (b) =>
        String(b.id) === String(brandId) ||
        String(b.brand || b.name) === String(brandId)
    );

    handleChange("brandId", brandId || null);
    handleChange("brand", brandObj ? brandObj.name ?? brandObj.brand : "");
    handleChange("modelName", "");
    handleChange("connector", "");
    handleChange("batteryCapacity", "");
    handleChange("modelId", "");

    if (!brandId) {
      setModelList([]);
      return;
    }

    try {
      const models = await getVehicleByBrand(brandId);
      const list = Array.isArray(models) ? models : models?.result ?? [];
      console.log("Model theo brand:", list);
      setModelList(list);
    } catch (err) {
      console.error("Lỗi load models:", err);
      setModelList([]);
    }
  };

  // Khi chọn mẫu xe
  const handleModelChange = (e) => {
    const modelName = e.target.value;
    handleChange("modelName", modelName);

    const selected = modelList.find(
      (m) => m.modelName === modelName || m.name === modelName
    );
    if (selected) {
      handleChange("connector", selected.connector || "");
      handleChange("batteryCapacity", selected.batteryCapacity || "");
      handleChange("modelId", selected.id ?? selected.modelId ?? null);
    } else {
      handleChange("connector", "");
      handleChange("batteryCapacity", "");
      handleChange("modelId", "");
    }
  };

  const handleLicenseChange = (e) => {
    handleChange("licensePlate", e.target.value);
  };

  // Gửi API tạo vehicle
  const handleCreateVehicle = async () => {
    if (!vehicleData.modelId || !vehicleData.licensePlate.trim()) {
      alert("Vui lòng chọn mẫu xe và nhập biển số!");
      return;
    }

    try {
      const payload = {
        modelId: vehicleData.modelId,
        licensePlate: vehicleData.licensePlate.trim(),
      };

      console.log("Gửi tạo xe:", payload);
      const res = await createCompanyVehicle(payload);

      alert("Tạo xe thành công!");
      console.log("Kết quả tạo xe:", res);

      // Reset form sau khi tạo thành công
      setVehicleData({
        brandId: "",
        brand: "",
        modelId: "",
        modelName: "",
        connector: "",
        batteryCapacity: "",
        licensePlate: "",
      });
      setModelList([]);
    } catch (err) {
      console.error("Lỗi khi tạo xe:", err);
      alert("Không thể tạo xe, vui lòng thử lại!");
    }
  };

  return (
    <div className="flex flex-col gap-3 p-10">
      <div className="flex flex-col items-center mb-10">
        <div className="title text-[black] text-4xl font-bold">Đăng ký xe điện</div>
      </div>

      <div className="middle flex flex-1 flex-col items-center justify-center gap-10">
        <div className="w-full max-w-5xl mx-auto">
          <div className="bg-[#D9D9D9] p-6 md:p-10 shadow-sm rounded-[36px] max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-[40px] h-[40px] bg-[#009951] flex items-center justify-center rounded-full">
                <Car className="text-[black]" />
              </div>
              <div className="title text-[black] font-bold text-2xl md:text-3xl">
                Thông tin xe điện
              </div>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cột trái */}
              <div className="flex flex-col gap-4">
                {/* Hãng xe */}
                <div className="flex flex-col gap-1 text-[black]">
                  <label htmlFor="Brand" className="font-medium text-gray-700">
                    Hãng xe:
                  </label>
                  <select
                    id="Brand"
                    value={vehicleData.brandId || ""}
                    onChange={handleBrandChange}
                    className="w-full border rounded-md px-3 py-2 border-black bg-white"
                    disabled={loading}
                  >
                    <option value="">-- Chọn hãng xe điện --</option>
                    {brandsData.map((brand) => (
                      <option key={brand.id ?? brand.name} value={brand.id ?? brand.name}>
                        {brand.name ?? brand.brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Cổng sạc */}
                <div className="flex flex-col gap-1 text-[black]">
                  <label htmlFor="ChargeType" className="font-medium text-gray-700">
                    Loại cổng sạc:
                  </label>
                  <input
                    id="ChargeType"
                    value={vehicleData.connector || ""}
                    readOnly
                    className="w-full border rounded-md px-3 py-2 border-black bg-white"
                  />
                </div>

                {/* Dung lượng */}
                <div className="flex flex-col gap-1 text-[black]">
                  <label htmlFor="Battery" className="font-medium text-gray-700">
                    Dung lượng:
                  </label>
                  <input
                    id="Battery"
                    value={
                      vehicleData.batteryCapacity
                        ? `${vehicleData.batteryCapacity} kWh`
                        : ""
                    }
                    readOnly
                    className="w-full border rounded-md px-3 py-2 border-black bg-white"
                  />
                </div>
              </div>

              {/* Cột phải */}
              <div className="flex flex-col gap-4">
                {/* Tên xe */}
                <div className="flex flex-col gap-1 text-[black]">
                  <label htmlFor="ModelName" className="font-medium text-gray-700">
                    Tên xe:
                  </label>
                  <select
                    id="ModelName"
                    value={vehicleData.modelName || ""}
                    onChange={handleModelChange}
                    className="w-full border rounded-md px-3 py-2 border-black bg-white"
                    disabled={modelList.length === 0}
                  >
                    <option value="">-- Chọn mẫu xe --</option>
                    {modelList.map((model) => (
                      <option
                        key={model.id ?? model.modelId}
                        value={model.modelName ?? model.name}
                      >
                        {model.modelName ?? model.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Biển số */}
                <div className="flex flex-col gap-1 text-[black]">
                  <label htmlFor="LicensePlate" className="font-medium text-gray-700">
                    Biển số xe:
                  </label>
                  <input
                    type="text"
                    id="LicensePlate"
                    value={vehicleData.licensePlate || ""}
                    onChange={handleLicenseChange}
                    placeholder="VD: 36A - 183636"
                    className="w-full border rounded-md px-3 py-2 border-black bg-white"
                  />
                </div>

                <div className="flex-1" />
              </div>
            </div>

            {/* Nút tạo xe */}
            <div className="flex justify-end mt-6">
              <button
                onClick={handleCreateVehicle}
                className="flex items-center justify-center bg-[#009951] text-white font-bold py-3 px-6 rounded-full hover:bg-green-600"
              >
                Tạo xe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVehicleCompany;
