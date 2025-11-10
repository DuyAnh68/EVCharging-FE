import { useEffect, useState } from "react";
import useCompany from "../../hooks/useCompany";

const AddDriver = () => {
  const { createDriver, getCompanyVehicle, loading, error } = useCompany();
  const [vehicles, setVehicles] = useState([]);

  // State form
  const [form, setForm] = useState({
    name: "",
    email: "",
    vehicleId: "",
  });

  // Lấy danh sách xe của công ty
  useEffect(() => {
    const fetchVehicles = async () => {
      const data = await getCompanyVehicle();
      if (data) setVehicles(data);
    };
    fetchVehicles();
  }, []);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Gửi form tạo tài xế
  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.vehicleId) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const payload = {
      email: form.email,
      name: form.name,
      vehicleId: form.vehicleId,
    };

    const res = await createDriver(payload);
    if (res) {
      alert("Tạo tài xế thành công!");
      setForm({ name: "", email: "", vehicleId: "" });
    }
  };

  return (
    <div className="flex flex-col gap-3 p-10">
      <div className="flex flex-col items-center mb-10">
        <div className="title text-[black] text-4xl font-bold">
          Đăng ký tài xế
        </div>
      </div>

      <div className="middle flex flex-1 flex-col items-center justify-center gap-10">
        <div className="w-full max-w-5xl mx-auto">
          <div className="bg-[#D9D9D9] p-6 md:p-10 shadow-sm rounded-[36px] max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-[40px] h-[40px] bg-[#009951] flex items-center justify-center rounded-full" />
              <div className="title text-[black] font-bold text-2xl md:text-3xl">
                Thông tin tài xế
              </div>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Danh sách xe */}
              <div className="flex flex-col gap-1 text-[black]">
                <label htmlFor="vehicleId" className="font-medium text-gray-700">
                  Danh sách xe:
                </label>
                <select
                  id="vehicleId"
                  name="vehicleId"
                  value={form.vehicleId}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 border-black bg-white"
                  disabled={loading}
                >
                  <option value="">-- Chọn xe điện --</option>
                  {vehicles
                  .filter((v) => v?.vehicleSubscriptionResponse?.status === "PENDING") //
                  .map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name ?? `${v?.model?.brandName} - ${v?.model?.modelName} - ${v.licensePlate}`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1 text-[black]">
                <label htmlFor="email" className="font-medium text-gray-700">
                  Email tài xế:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="VD: driver@example.com"
                  className="w-full border rounded-md px-3 py-2 border-black bg-white"
                />
              </div>

              {/* Tên tài xế */}
              <div className="flex flex-col gap-1 text-[black]">
                <label htmlFor="name" className="font-medium text-gray-700">
                  Tên tài xế:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="VD: Nguyễn Văn A"
                  className="w-full border rounded-md px-3 py-2 border-black bg-white"
                />
              </div>
            </div>

            {/* Nút tạo tài xế */}
            <div className="flex justify-end mt-6">
              <button
                onClick={handleSubmit}
                className="flex items-center justify-center bg-[#009951] text-white font-bold py-3 px-6 rounded-full hover:bg-green-600"
                disabled={loading}
              >
                {loading ? "Đang tạo..." : "Tạo tài xế"}
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-center mt-4">
                 Lỗi: {error.toString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDriver;
