import React from "react";
import { Link } from "react-router-dom";

function VehicleCard({ vehicle }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 hover:shadow-lg transition">
      <img
        src={vehicle.image}
        alt={vehicle.name}
        className="w-full h-40 object-cover rounded mb-2"
      />
      <div className="font-bold text-xl text-[#14AE5C]">{vehicle.name}</div>
      <div className="text-gray-700">
        Biển số: <span className="font-medium">{vehicle.licensePlate}</span>
      </div>
      <div className="text-gray-700">Loại: {vehicle.type}</div>
      <div className="text-gray-700">Màu: {vehicle.color}</div>
      <div className="text-gray-700">Năm: {vehicle.year}</div>
      <Link
        to={`/vehicle/${vehicle.id}`}
        className="mt-2 bg-[#009951] text-white px-4 py-2 rounded hover:bg-[#00b35c] transition text-center"
      >
        Xem chi tiết
      </Link>
    </div>
  );
}

export default VehicleCard;