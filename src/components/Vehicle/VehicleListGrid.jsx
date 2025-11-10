import VehicleCard from "./VehicleCard";
import useVehicle from "../../hooks/useVehicle";
import { useEffect, useState } from "react";

const VehicleListGrid = () => {
  const { getVehicle, vehicle, loading, error } = useVehicle();
  const [vehicles, setVehicles] = useState([]);

  console.log("1", vehicle);

  useEffect(() => {
     const fetchData = async () => {
    const data = await getVehicle();
    setVehicles(data);
  };
  fetchData();
  },[]);

  const handleDeleted = (id) => {
    // optimistic remove
    setVehicles((prev) => prev.filter((v) => v.id !== id));
    // optionally re-fetch: getVehicle().then(...)
  };

  
  // if (loading) return <p>Đang tải danh sách xe...</p>;
  // if (error) return <p className="text-[red]">Lỗi: {error}</p>
  // if (vehicles?.length === 0) return <p>Chưa có xe nào trong danh sách xe của bạn</p>;

  return (
    <div className="container mx-auto p-4">
      {loading && (
          <div className="flex flex-col items-center text-gray-600">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#00B35C] mb-3" />
            <p className="font-medium">Đang tải danh sách xe...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center text-red-600 font-semibold">
             Lỗi tải dữ liệu: {error}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && vehicles?.length === 0 && (
          <div className="text-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-16 w-16 text-gray-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 17h16M4 13h16m-7-9l7 9-7 9"
              />
            </svg>
            <p className="text-lg font-medium">
              Chưa có xe nào trong danh sách của bạn
            </p>
            <p className="text-sm text-gray-400">
              Hãy thêm xe để bắt đầu quản lý phương tiện.
            </p>
          </div>
        )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vehicles?.map((v) => (
          <VehicleCard key={v.id} data={v} onDeleted={handleDeleted} />
        ))}
      </div>
    </div>
  );
};

export default VehicleListGrid;
