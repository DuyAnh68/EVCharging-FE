import React, { useEffect, useState } from "react";
import VehicleCard from "./VehicleCard";
import mockVehicles from "../../data/mockVehicles";

const VehicleListGrid = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Tạm thời giả lập API
    setTimeout(() => {
      setVehicles(mockVehicles);
    }, 300);
  }, []);

  if (!vehicles.length) return <p>Đang tải danh sách xe...</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vehicles.map((v) => (
          <VehicleCard key={v.id} data={v} />
        ))}
      </div>
    </div>
  );
};

export default VehicleListGrid;
