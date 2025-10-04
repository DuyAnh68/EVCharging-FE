import React from "react";
import VehicleListGrid from "../../components/Vehicle/VehicleListGrid";

function VehicleList() {
  return (
    <div className="bg-amber-950 p-10">
      <div className="top flex justify-between">
        <div className="title text-[#14AE5C] text-4xl font-bold">
          Danh sách xe của bạn
        </div>
        <div className="button">
          <button>Thêm xe</button>
        </div>
      </div>
      <div className="middle ">
        <VehicleListGrid />
      </div>
    </div>
  );
}

export default VehicleList;
