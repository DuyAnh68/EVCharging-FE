import React from "react";
import { useParams, Link } from "react-router-dom";
import mockVehicles from "../../data/mockVehicles";

function VehicleDetail() {
  const { id } = useParams();
  const vehicle = mockVehicles.find((v) => v.id === Number(id));

  if (!vehicle) {
    return (
      <div className="p-8">
        <div className="text-2xl font-bold !text-red-600">
          Xe không tồn tại.
        </div>
        <Link
          to="/vehicle-list"
          className="!text-[#009951] underline mt-4 block"
        >
          Quay lại danh sách xe
        </Link>
      </div>
    );
  }

  return (
    <div className="!bg-[#F6F9EE] min-h-screen flex flex-col items-center px-6 py-8">
      <div className="max-w-xl w-full !bg-white rounded-lg shadow p-6">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-56 object-cover rounded mb-4"
        />
        <div className="font-bold text-2xl !text-[#14AE5C] mb-2">
          {vehicle.name}
        </div>
        <div className="mb-1 !text-gray-700">
          Biển số: <span className="font-medium">{vehicle.licensePlate}</span>
        </div>
        <div className="mb-1 text-gray-700">Loại: {vehicle.type}</div>
        <div className="mb-1 text-gray-700">Màu: {vehicle.color}</div>
        <div className="mb-1 text-gray-700">Năm: {vehicle.year}</div>
        <Link
          to="/vehicle-list"
          className="inline-block mt-6 !bg-[#009951] !text-white px-4 py-2 rounded hover:!bg-[#00b35c] transition"
        >
          Quay lại danh sách xe
        </Link>
      </div>
    </div>
  );
}

export default VehicleDetail;
