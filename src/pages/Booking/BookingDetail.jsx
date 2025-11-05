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

  const countAvailableSpots = () => {
    return spots.filter(
      (spot) => spot.status === "AVAILABLE" && spot.spotType === "BOOKING"
    ).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
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
              <div className="flex items-start gap-2 text-gray-600 mb-4">
                <span className="text-lg mt-0.5">📍</span>
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
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-xl">🕐</span>
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
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <span className="text-xl">📅</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800">
                Lịch trống hôm nay
              </h3>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 gap-2 mb-6">
              {station?.schedule?.map((slot, i) => (
                <div
                  key={i}
                  className={`border-2 rounded-xl p-3 text-center transition-all hover:scale-105 ${
                    slot.available === 0
                      ? "bg-gray-100 border-gray-300 text-gray-400"
                      : "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-300 text-emerald-700 shadow-sm"
                  }`}
                >
                  <p className="font-bold text-sm">{slot.time}</p>
                  <p className="text-xs mt-1">
                    {slot.available > 0 ? `${slot.available}/40` : "Hết chỗ"}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-dashed border-gray-200 pt-6">
              {availableVehicles?.length > 0 ? (
                <div className="space-y-4 mb-5">
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Chọn xe của bạn:
                  </label>
                  <select
                    className="mb-5 w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-gray-700 font-medium bg-gradient-to-r from-slate-50 to-gray-50"
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
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">🎫</span>
                        <div className="flex-1 space-y-1 text-sm">
                          <p className="text-gray-700">
                            <span className="font-semibold">Gói:</span>{" "}
                            {
                              selectedVehicle.vehicleSubscriptionResponse
                                .subscriptionPlanResponse.name
                            }
                          </p>
                          <p className="text-gray-700">
                            <span className="font-semibold">Giá:</span>{" "}
                            <span className="text-indigo-600 font-bold">
                              {
                                selectedVehicle.vehicleSubscriptionResponse
                                  .subscriptionPlanResponse.price
                              }
                              ₫
                            </span>
                          </p>
                          <p className="text-gray-700">
                            <span className="font-semibold">Trạng thái:</span>{" "}
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                              {
                                selectedVehicle.vehicleSubscriptionResponse
                                  .status
                              }
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                  <p className="text-gray-500 text-lg">
                    🚗 Bạn chưa có xe nào trong hệ thống
                  </p>
                </div>
              )}

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
                className={`w-full mt-6 px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                  !selectedVehicle ||
                  selectedVehicle.vehicleSubscriptionResponse.status !==
                    "ACTIVE"
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl hover:scale-105"
                }`}
              >
                {selectedVehicle ? "🚀 Bắt đầu đặt chỗ" : "Chọn xe để tiếp tục"}
              </button>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center">
                <span className="text-xl">📋</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800">
                Thông tin đặt chỗ
              </h3>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <span className="text-lg">🏢</span>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Trạm sạc</p>
                  <p className="text-sm font-bold text-gray-800">
                    {station?.stationName}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <span className="text-lg">🚗</span>
                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    Xe đã chọn
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    {selectedVehicle
                      ? `${selectedVehicle.model.brandName} ${selectedVehicle.model.modelName} - ${selectedVehicle.licensePlate}`
                      : "Chưa chọn xe"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-50 to-gray-100 rounded-xl p-4 border-2 border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                  <span className="text-sm font-semibold text-gray-700">
                    Vị trí hiện tại
                  </span>
                </div>

                <div className="flex-1 mx-4 border-t-2 border-dashed border-gray-400 relative">
                  <div className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-2 rounded-full border border-gray-300">
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

              <p className="text-xs text-center text-gray-500 mt-4 italic">
                💡 Lưu ý: Vui lòng đến đúng giờ đặt chỗ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationDetail;
