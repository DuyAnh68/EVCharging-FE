import React from "react";
import mockVehicles from "../../data/mockVehicles";
import VehicleCard from "./VehicleCard";

function VehicleListGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {mockVehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}

export default VehicleListGrid;