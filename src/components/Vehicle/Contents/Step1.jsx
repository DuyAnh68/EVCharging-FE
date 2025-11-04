// ...existing code...
import React, { useContext, useEffect, useState, useMemo } from "react";
import { Car } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import StepperContext from "../../../contexts/Vehicle/StepperProvider";
import useVehicle from "../../../hooks/useVehicle";
import useBrand from "../../../hooks/useBrand";

function VehicleInf() {
  const { getVehicleByBrand, loading } = useVehicle();
  const { getBrands } = useBrand();
  const { currentStep, setCurrentStep, vehicleData, setVehicleData } = useContext(StepperContext);

  const [brandsData, setBrandsData] = useState([]); 
  const [modelList, setModelList] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getBrands();
        console.log("res", res);
        if (res) {
          setBrandsData(res)

          // nếu đã có brandId chọn sẵn (back navigation), khởi tạo modelList tương ứng
          if (vehicleData?.brandId) {
            const models = await getVehicleByBrand(vehicleData.brandId);
            setModelList(models || []);
          }
        }
      } catch (e) {
        console.error("fetch brands error", e);
      }
    };
    fetch();
  }, []); // chỉ gọi 1 lần khi mount

  // Hàm tiện ích cập nhật vehicleData
  const handleChange = (field, value) => {
    setVehicleData((prev) => ({ ...prev, [field]: value }));
  };

  // Hãng xe: khi chọn, gọi API lấy models theo brandId rồi lưu brandId vào vehicleData
  const handleBrandChange = async(e) => {
    const brandId = e.target.value;
    const brandObj = brandsData.find((b) => String(b.id) === String(brandId) || String(b.brand || b.name) === String(brandId));  
    handleChange("brandId", brandId || null);
    handleChange("brand", brandObj ? (brandObj.name ?? brandObj.brand) : "");
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
      // nếu API trả về { result: [...] } chuẩn hoá
      const list = Array.isArray(models) ? models : models?.result ?? [];
      setModelList(list);
    } catch (err) {
      console.error("Lỗi load models theo brand:", err);
      setModelList([]);
    }
  };

  // Mẫu xe
  const handleModelChange = (e) => {
    const modelName = e.target.value;
    handleChange("modelName", modelName);

    const selected = modelList.find((m) => m.modelName === modelName || m.name === modelName);
    if (selected) {
      // một số API trả id là id, một số trả modelId -> cố gắng dùng cả hai
      handleChange("connector", selected.connector || "");
      handleChange("batteryCapacity", selected.batteryCapacity || "");
      handleChange("modelId", selected.id ?? selected.modelId ?? null);
    } else {
      handleChange("connector", "");
      handleChange("batteryCapacity", "");
      handleChange("modelId", "");
    }
  };

  // Biển số
  const handleLicenseChange = (e) => {
    handleChange("licensePlate", e.target.value);
  };

  // Tiếp tục
  const handleNext = () => {
    if (!vehicleData.modelId || !vehicleData.licensePlate) {
      alert("Vui lòng nhập đầy đủ thông tin xe trước khi tiếp tục!");
      return;
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };


  return (
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

      {/* Form: responsive grid */}
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
                <option key={model.id ?? model.modelId} value={model.modelName ?? model.name}>
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

          {/* spacer để nút căn dưới cột phải trên màn nhỏ */}
          <div className="flex-1" />
        </div>
      </div>

      {/* Nút Tiếp tục */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleNext}
          className="flex items-center justify-center bg-[#009951] text-white font-bold py-3 px-6 rounded-full hover:bg-green-600"
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
}

export default VehicleInf;
