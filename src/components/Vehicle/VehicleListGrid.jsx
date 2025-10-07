import React from "react";
import VehicleCard from "./VehicleCard";

const VehicleListGrid = () => {
  // Mock data array với nhiều vehicles
  const vehicles = [
    {
      id: "V001",
      name: "Tesla Model 3",
      licensePlate: "51F-123.45",
      batteryCapacity: 82,
      currentCharge: 75,
      status: "Available",
      lastCharged: "2023-10-05",
    },
    {
      id: "V002",
      name: "Tesla Model Y",
      licensePlate: "51F-678.90",
      batteryCapacity: 75,
      currentCharge: 45,
      status: "Charging",
      lastCharged: "2023-10-04",
    },
    {
      id: "V003",
      name: "VinFast VF8",
      licensePlate: "51F-111.22",
      batteryCapacity: 90,
      currentCharge: 60,
      status: "Available",
      lastCharged: "2023-10-03",
    },
    {
      id: "V004",
      name: "VinFast VF9",
      licensePlate: "51F-333.44",
      batteryCapacity: 100,
      currentCharge: 30,
      status: "Maintenance",
      lastCharged: "2023-10-02",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-3 gap-4">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} data={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default VehicleListGrid;
