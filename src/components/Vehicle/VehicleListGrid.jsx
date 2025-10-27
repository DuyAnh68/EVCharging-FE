import VehicleCard from "./VehicleCard";
import useVehicle from "../../hooks/useVehicle";
import { useEffect } from "react";

const VehicleListGrid = () => {
  const { getVehicle, vehicle, loading, error } = useVehicle();

  useEffect(() => {
    getVehicle();
  }, []);

  if (!vehicle) return <p>Chưa có xe nào trong danh sách xe của bạn</p>;
  if (loading) return <p>Đang tải danh sách xe...</p>;
  if (error) return <p className="text-[red]">Lỗi: {error}</p>
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vehicle?.map((v) => (
          <VehicleCard key={v.id} data={v} />
        ))}
      </div>
    </div>
  );
};

export default VehicleListGrid;
