import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useVehicle from "../../hooks/useVehicle";
import useStation from "../../hooks/useStation";
import useSpots from "../../hooks/useSpot";

const StationDetail = () => {
  const { id } = useParams();
  const { getVehicle, vehicle } = useVehicle();
  const { station, getStationById } = useStation();
  const { spots, loading, error, getSpotsByStationId } = useSpots();
  const [distance, setDistance] = useState(null);

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          };

          if (station?.latitude && station?.longitude) {
            const d = getDistanceFromLatLonInKm(
              coords.latitude,
              coords.longitude,
              station.latitude,
              station.longitude
            );
            setDistance(d);
          }
        },
        (err) => console.warn("Không thể lấy vị trí:", err),
        { enableHighAccuracy: true }
      );
    } else {
      console.warn("Trình duyệt không hỗ trợ Geolocation API");
    }
  }, [station?.latitude, station?.longitude]);

  useEffect(() => {
    getVehicle();
    getStationById(id);
    getSpotsByStationId(id);
  }, [station?.id]);

  console.log(vehicle);

  const countAvailableSpots = () => {
    return spots.filter(
      (spot) => spot.status === "AVAILABLE" && spot.spotType === "BOOKING"
    ).length;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 bg-white rounded-2xl shadow p-4">
        <img
          src={
            station?.image ||
            "https://greencharge.vn/wp-content/uploads/2023/04/greencharge-38.jpg"
          }
          alt={station?.name}
          className="w-full h-52 object-cover rounded-xl"
        />
        <h2 className="text-xl font-bold mt-3">{station?.name}</h2>
        <p className="text-gray-600">{station?.location}</p>

        <div className="flex items-center mt-2">
          <span className="text-green-600 font-medium">
            {station?.status === "Active"
              ? "Đang hoạt động"
              : "Ngưng hoạt động"}
          </span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-gray-600">
            {countAvailableSpots()} trụ sạc khả dụng
          </span>
        </div>

        <h3 className="font-semibold mt-4">
          Công suất: <span>{station?.powerCapacity} kW</span>
        </h3>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h3 className="font-semibold mb-2">Giờ hoạt động</h3>
            <p className="text-sm">Thứ 2 - Thứ 6: 06:00 - 22:00</p>
            <p className="text-sm">Thứ 7: 07:00 - 20:00</p>
            <p className="text-sm">Chủ nhật: 08:00 - 18:00</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Tình trạng hiện tại</h3>
            <div className="space-y-1 text-sm">
              {loading && <p>Đang tải...</p>}
              {error && <p className="text-red-500">Không thể tải dữ liệu</p>}

              {!loading &&
                !error &&
                spots
                  ?.filter((spot) => spot.spotType === "BOOKING")
                  ?.map((spot) => {
                    let colorClass = "bg-gray-400";
                    if (spot.status === "AVAILABLE")
                      colorClass = "bg-green-500";
                    else if (spot.status === "IN_USE")
                      colorClass = "bg-yellow-400";
                    else if (spot.status === "ERROR") colorClass = "bg-red-500";

                    return (
                      <div key={spot.id} className="flex items-center gap-2">
                        <span
                          className={`w-3 h-3 rounded-full ${colorClass}`}
                        ></span>
                        {spot.spotName} –{" "}
                        <span className="capitalize">
                          {spot.status.toLowerCase()}
                        </span>
                      </div>
                    );
                  })}

              {!loading && !error && spots?.length === 0 && (
                <p className="text-gray-500">Không có trụ sạc khả dụng</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="font-semibold mb-3">
            Lịch giờ & số cổng trống (hôm nay)
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 text-center">
            {station?.schedule?.map((slot, i) => (
              <div
                key={i}
                className={`border rounded-md p-2 ${
                  slot.available === 0
                    ? "bg-gray-100 text-gray-400"
                    : "bg-green-50 border-green-400"
                }`}
              >
                <p className="font-semibold">{slot.time}</p>
                <p className="text-xs">
                  {slot.available > 0 ? `Còn ${slot.available}/40` : "Hết"}
                </p>
              </div>
            ))}
          </div>

          <button className="mt-4 !bg-green-600 text-white px-4 py-2 rounded-md hover:!bg-green-700 transition">
            Bắt đầu đặt chỗ
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="font-semibold mb-3">Đặt chỗ của bạn</h3>
          <div className="text-sm space-y-1">
            <p>
              <strong>Trạm sạc:</strong> {station?.name}
            </p>

            <p>
              <strong>Xe:</strong>
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-red-600">📍 Vị trí hiện tại</span>
            </div>
            <div className="text-center flex-1 border-t-2 border-dashed mx-2 border-gray-300 relative">
              <span className="absolute left-1/2 -translate-x-1/2 text-gray-500 text-xs">
                {distance ? distance.toFixed(2) : "–"} km
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-600">⚡ Trạm sạc</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-3">
            Lưu ý: Đến đúng giờ đặt chỗ
          </p>
        </div>
      </div>
    </div>
  );
};

export default StationDetail;
