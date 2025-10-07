import React from "react";
import { Battery, Zap, Car, Gauge } from "lucide-react";

const VehicleCard = ({ data }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-[#FFFFFF] m-4">
      <div className=" px-6 py-4">
        <div className="">
          <img className="w-full h-48 object-cover" src={data.image} alt={data.name} />
        </div>
        <div className="font-bold text-xl mb-2 text-black">Vehicle Name</div>

        <div className="text-gray-700 text-base">
          <p className="mb-2">
            <span className="font-semibold">License Plate:</span>{" "}
            {data.licensePlate}
          </p>
          <div className="flex justify-center gap-5 items-center">
          <div className="flex items-center mb-2 text-gray-700">
            <Battery size={18} className="mr-2 text-blue-500" />
            <span>{data.currentCharge}%</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1.5">
          <div
            className="bg-[#0073D1] h-2.5 rounded-full"
            style={{ width: `${data.currentCharge}%` }}
          ></div>
        </div>

          </div>
 
          <div className="flex items-center text-gray-600 mb-3">
          <Gauge size={18} className="mr-2 text-gray-500" />
          <span>{220} miles range</span>
        </div>

          <div className="mb-3">
          <span
            className={`px-3 py-1 text-sm rounded-full ${
              data.status === "Parked"
                ? "bg-gray-100 text-gray-700"
                : data.status === "Charging"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {data.status}
          </span>
        </div>
        </div>
      </div>

      <div className="px-6 pt-4 pb-4 flex justify-between bg-[#F9FAFB]">
        <button className="!bg-[#FFFFFF] !text-[black] !border-[#D8D9DC]">
            Thuê bao
        </button>
        <button className="!bg-[#0073D1] !text-[white] !border-[#0073D1] ">
          Sạc ngay
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;
