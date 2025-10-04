import React from "react";

const VehicleCard = ({ data }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{data.name}</div>

        <div className="text-gray-700 text-base">
          <p className="mb-2">
            <span className="font-semibold">License Plate:</span>{" "}
            {data.licensePlate}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Battery Capacity:</span>{" "}
            {data.batteryCapacity} kWh
          </p>
          <p className="mb-2">
            <span className="font-semibold">Current Charge:</span>{" "}
            {data.currentCharge}%
          </p>
          <p className="mb-2">
            <span className="font-semibold">Status:</span>
            <span
              className={`${
                data.status === "Available" ? "text-green-600" : "text-red-600"
              } ml-1 font-medium`}
            >
              {data.status}
            </span>
          </p>
          <p className="mb-2">
            <span className="font-semibold">Last Charged:</span>{" "}
            {data.lastCharged}
          </p>
        </div>
      </div>

      <div className="px-6 pt-4 pb-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View Details
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;
