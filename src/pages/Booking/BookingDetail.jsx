import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useVehicle from "../../hooks/useVehicle";
import useStation from "../../hooks/useStation";
import useSpots from "../../hooks/useSpot";

const StationDetail = () => {
  const { id } = useParams();
  const { getVehicle, vehicle } = useVehicle();
  const { station, getStationById } = useStation();
  const { spots, getSpotsByStationId } = useSpots();
  const [distance, setDistance] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const navigate = useNavigate();

  const filterVehiclesBySubscriptionStatus = (vehicles) => {
    return vehicles?.filter(
      (vehicle) => vehicle.vehicleSubscriptionResponse.status === "ACTIVE"
    );
  };

  const availableVehicles = filterVehiclesBySubscriptionStatus(vehicle);

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

          if (station?.latitude && station?.longtitude) {
            const d = getDistanceFromLatLonInKm(
              coords.latitude,
              coords.longitude,
              station.latitude,
              station.longtitude
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
  }, [station?.latitude, station?.longtitude]);

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
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Station Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Station Card */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
            <div className="relative">
              <img
                src={
                  station?.image ||
                  "https://greencharge.vn/wp-content/uploads/2023/04/greencharge-38.jpg"
                }
                alt={station?.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <span
                  className={`font-semibold ${
                    station?.status === "AVAILABLE"
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {station?.status === "AVAILABLE" ? "● Hoạt động" : "● Ngưng"}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {station?.stationName}
              </h2>
              <div className="flex items-start gap-2 text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  style={{ marginTop: 10 }}
                >
                  <path
                    fill="currentColor"
                    d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2z"
                  ></path>
                </svg>
                <p className="flex-1">{station?.location}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                  <span className="text-gray-700 font-medium">
                    Trụ khả dụng
                  </span>
                  <span className="text-2xl font-bold text-emerald-600">
                    {countAvailableSpots()}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                  <span className="text-gray-700 font-medium">Công suất</span>
                  <span className="text-2xl font-bold text-amber-600">
                    {station?.powerCapacity} kW
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Operating Hours Card */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-tr from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="white"
                    d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m4.2 14.2L11 13V7h1.5v5.2l4.5 2.7z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800">Giờ hoạt động</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 hover:bg-slate-50 rounded-lg transition">
                <span className="text-gray-600">Thứ 2 - Thứ 6</span>
                <span className="font-semibold text-gray-800">
                  06:00 - 22:00
                </span>
              </div>
              <div className="flex justify-between p-2 hover:bg-slate-50 rounded-lg transition">
                <span className="text-gray-600">Thứ 7</span>
                <span className="font-semibold text-gray-800">
                  07:00 - 20:00
                </span>
              </div>
              <div className="flex justify-between p-2 hover:bg-slate-50 rounded-lg transition">
                <span className="text-gray-600">Chủ nhật</span>
                <span className="font-semibold text-gray-800">
                  08:00 - 18:00
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Charging Spots Status */}

          {/* Schedule & Booking Section */}
          {/* Schedule & Booking Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-200 relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={26}
                  height={26}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 14a1 1 0 1 0-1-1a1 1 0 0 0 1 1m5 0a1 1 0 1 0-1-1a1 1 0 0 0 1 1m-5 4a1 1 0 1 0-1-1a1 1 0 0 0 1 1m5 0a1 1 0 1 0-1-1a1 1 0 0 0 1 1M7 14a1 1 0 1 0-1-1a1 1 0 0 0 1 1M19 4h-1V3a1 1 0 0 0-2 0v1H8V3a1 1 0 0 0-2 0v1H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3m1 15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9h16Zm0-11H4V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1ZM7 18a1 1 0 1 0-1-1a1 1 0 0 0 1 1"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold text-gray-800 tracking-tight">
                Tiến hành đặt chỗ
              </h3>
            </div>

            <div className="border-t border-dashed border-gray-200 pt-8">
              {availableVehicles?.length > 0 ? (
                <div className="space-y-4 mb-3">
                  <h4 className="text-base font-semibold text-gray-700 mb-3">
                    Chọn xe của bạn:
                  </h4>

                  <select
                    className="mb-5 w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-gray-700 font-medium bg-gradient-to-r from-slate-50 to-gray-50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    value={selectedVehicle?.id || ""}
                    onChange={(e) =>
                      setSelectedVehicle(
                        availableVehicles.find(
                          (v) => v.id === Number(e.target.value)
                        )
                      )
                    }
                  >
                    <option value="">-- Chọn xe của bạn --</option>
                    {availableVehicles.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.model.brandName} {v.model.modelName} -{" "}
                        {v.licensePlate}
                      </option>
                    ))}
                  </select>

                  {selectedVehicle && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <p className="text-gray-700 font-semibold">
                            Gói:{" "}
                            {
                              selectedVehicle.vehicleSubscriptionResponse
                                .subscriptionPlanResponse.name
                            }
                          </p>
                          <p className="text-sm text-gray-600">
                            Giá:{" "}
                            {
                              selectedVehicle.vehicleSubscriptionResponse
                                .subscriptionPlanResponse.price
                            }{" "}
                            VND/tháng
                          </p>
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 uppercase tracking-wide">
                          {selectedVehicle.vehicleSubscriptionResponse.status}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                  <p className="text-gray-500 text-lg">
                    🚗 Bạn chưa có xe nào trong hệ thống
                  </p>
                </div>
              )}
            </div>

            {/* Step 3: Confirm Button */}
            <div className="mt-8">
              <button
                onClick={() =>
                  navigate("/bookingSchedule", {
                    state: { vehicle: selectedVehicle, stationId: id },
                  })
                }
                disabled={
                  !selectedVehicle ||
                  selectedVehicle.vehicleSubscriptionResponse.status !==
                    "ACTIVE"
                }
                className={`w-full px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                  !selectedVehicle ||
                  selectedVehicle.vehicleSubscriptionResponse.status !==
                    "ACTIVE"
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 hover:shadow-xl scale-105"
                }`}
              >
                {selectedVehicle ? "Bắt đầu đặt chỗ" : "Chọn xe để tiếp tục"}
              </button>
            </div>
          </div>

          {/* Booking Summary */}
          {/* Booking Summary (New Design) */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-200 relative overflow-hidden">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-sky-50 opacity-60 pointer-events-none"></div>

            {/* Header */}
            <div className="relative flex  items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="white"
                    fillRule="evenodd"
                    d="M4.172 3.172C3 4.343 3 6.229 3 10v4c0 3.771 0 5.657 1.172 6.828S7.229 22 11 22h2c3.771 0 5.657 0 6.828-1.172S21 17.771 21 14v-4c0-3.771 0-5.657-1.172-6.828S16.771 2 13 2h-2C7.229 2 5.343 2 4.172 3.172M8 9.25a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5zm0 4a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Thông tin đặt chỗ
              </h3>
            </div>

            {/* Station Info */}
            <div className="relative space-y-3 mb-6">
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
                <div className="p-3 bg-gradient-to-tr from-emerald-500 to-teal-600 rounded-xl text-white shadow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M6 10h6V5H6zM4 21V5q0-.825.588-1.412T6 3h6q.825 0 1.413.588T14 5v7h1.25q.725 0 1.238.513T17 13.75v4.625q0 .425.35.775t.775.35q.45 0 .788-.35t.337-.775V9H19q-.425 0-.712-.288T18 8V6h.5V4.5h1V6h1V4.5h1V6h.5v2q0 .425-.288.713T21 9h-.25v9.375q0 1.05-.763 1.838T18.126 21q-1.075 0-1.85-.788t-.775-1.837V13.75q0-.125-.062-.187t-.188-.063H14V21zm4.5-2l2.5-4H9.5v-3L7 16h1.5z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Trạm sạc</p>
                  <p className="text-base font-semibold text-gray-800">
                    {station?.stationName}
                  </p>
                </div>
              </div>

              {/* Selected Vehicle */}
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-indigo-200 shadow-sm hover:shadow-md transition">
                <div className="p-3 bg-gradient-to-tr from-emerald-500 to-teal-600 rounded-xl rounded-xl text-white shadow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m5 11l1.5-4.5h11L19 11m-1.5 5a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5m-11 0A1.5 1.5 0 0 1 5 14.5A1.5 1.5 0 0 1 6.5 13A1.5 1.5 0 0 1 8 14.5A1.5 1.5 0 0 1 6.5 16M18.92 6c-.2-.58-.76-1-1.42-1h-11c-.66 0-1.22.42-1.42 1L3 12v8a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h12v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-8z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Xe đã chọn
                  </p>
                  <p className="text-base font-semibold text-gray-800">
                    {selectedVehicle
                      ? `${selectedVehicle.model.brandName} ${selectedVehicle.model.modelName} - ${selectedVehicle.licensePlate}`
                      : "Chưa chọn xe"}
                  </p>
                </div>
              </div>
            </div>

            {/* Distance Info */}
            <div className="relative bg-gradient-to-r from-slate-100 via-gray-50 to-slate-100 rounded-2xl border border-gray-200 p-5 shadow-inner">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                  <span className="text-sm font-semibold text-gray-700">
                    Vị trí hiện tại
                  </span>
                </div>

                <div className="flex-1 mx-4 border-t-2 border-dashed border-gray-300 relative">
                  <div className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-3 py-1 rounded-full border border-gray-300 shadow-sm">
                    <span className="text-xs font-bold text-indigo-600">
                      {distance ? `${distance.toFixed(2)} km` : "Đang tính..."}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-700">
                    Trạm sạc
                  </span>
                  <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
                </div>
              </div>

              <p className="text-xs text-center text-gray-500 mt-5 italic">
                💡 Vui lòng đến đúng giờ đặt chỗ để đảm bảo trải nghiệm sạc tốt
                nhất
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationDetail;
