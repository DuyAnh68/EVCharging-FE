import VehicleCard from "./VehicleCard";
import useVehicle from "../../hooks/useVehicle";

const VehicleListGrid = () => {
  const { getVehicle, vehicle, loading, error } = useVehicle();

  useEffect(() => {
    getVehicle();
  }, [getVehicle]);

  if (!vehicle.length) return <p>Đang tải danh sách xe...</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vehicle.map((v) => (
          <VehicleCard key={v.id} data={v} />
        ))}
      </div>
    </div>
  );
};

export default VehicleListGrid;
