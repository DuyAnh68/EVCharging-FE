import React from "react";
import SearchForm from "../../components/SearchForm";
import ChargingStationMapComponent from "../../components/Map/ChargingStationMap";

function ChargingStationMap() {
  return (
    <>
      <div className="title text-center">
        <h1 className="text-2xl font-bold mb-4">Tìm trạm sạc gần bạn</h1>
        <p>
          Khám phá và đặt chỗ tại hàng nghìn trạm sạc xe điện trên toàn quốc
        </p>
      </div>
      <div className="searchSpace">
        <SearchForm />
      </div>
      <div className="map mt-8">
        <ChargingStationMapComponent />
      </div>
    </>
  );
}

export default ChargingStationMap;
