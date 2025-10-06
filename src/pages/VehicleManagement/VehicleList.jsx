import React from "react";
import VehicleListGrid from "../../components/Vehicle/VehicleListGrid";
import { Outlet, Link } from "react-router-dom";

function VehicleList() {
  return (
    <div className="bg-[#F6F9EE] p-10">
      <div className="top flex justify-between">
        <div className="title text-[#14AE5C] text-4xl font-bold">
          Danh sách xe của bạn
        </div>

        <div className="button">
          <Link to="/AddVehicle"
            className="bg-[#009951] !text-white border border-[1] border-black px-4 py-2 rounded-lg hover:bg-[#00b35c] transition"
          >
          Thêm xe
          </Link>
        </div>

      </div>
      <div className="middle ">
        <VehicleListGrid />
      </div>
    </div>
  );
}

export default VehicleList;
