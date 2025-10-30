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

  
  if (loading) return <p>Đang tải danh sách xe...</p>;
  if (error) return <p className="text-[red]">Lỗi: {error}</p>
  if (vehicles?.length === 0) return <p>Chưa có xe nào trong danh sách xe của bạn</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vehicles?.map((v) => (
          <VehicleCard key={v.id} data={v} onDeleted={handleDeleted} />
        ))}
      </div>
    </div>
  );
};

export default VehicleListGrid;
