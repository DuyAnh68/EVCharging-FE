import React from "react";
import { Battery, Plug, Car } from "lucide-react";

const VehicleCard = ({ data }) => {
  const vehicle = data;

  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow bg-white border border-gray-200 m-4 transition hover:shadow-lg">
      {/* Ảnh hoặc icon xe */}
      <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
        <Car size={48} className="text-gray-400" />
      </div>

      {/* Nội dung */}
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-3 text-black">
          {vehicle?.model?.modelName || "Unknown Model"}
        </h2>

        <div className="text-gray-700 text-base space-y-2">
          <p>
            <span className="font-semibold">Brand:</span>{" "}
            {vehicle?.model?.brand || "N/A"}
          </p>

          <p>
            <span className="font-semibold">License Plate:</span>{" "}
            {vehicle?.licensePlate || "N/A"}
          </p>

          <div className="flex items-center">
            <Plug size={18} className="mr-2 text-blue-600" />
            <span>{vehicle?.model?.connector || "Unknown"}</span>
          </div>

          <div className="flex items-center">
            <Battery size={18} className="mr-2 text-green-600" />
            <span>{(vehicle?.model?.batteryCapacity || 0).toFixed(2)} kWh</span>
          </div>

          {/* Trạng thái */}
          <div className="mt-3">
            <span
              className={`px-3 py-1 text-sm rounded-full ${
                vehicle?.vehicleSubscriptionResponse?.status === "ACTIVE"
                  ? "bg-green-100 text-green-700"
                  : vehicle?.status === "PENDING"
                  ? "bg-gray-100 text-gray-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {vehicle?.vehicleSubscriptionResponse?.status || "UNKNOWN"}
            </span>
          </div>
        </div>
      </div>

      {/* Nút hành động */}
      <div className="px-6 pt-3 pb-4 flex justify-between bg-gray-50">
        <button className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
          Thuê bao
        </button>
        <button className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-blue-700 transition">
          Sạc ngay
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;
