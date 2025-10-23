import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useVehicle from "../../hooks/useVehicle";
import useStation from "../../hooks/useStation";
import useSpots from "../../hooks/useSpot";

const StationDetail = () => {
  const { id } = useParams();

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { getVehicle, vehicle } = useVehicle();
  const { station, getStationById } = useStation();
  const { spots, loading, error, getSpotsByStationId } = useSpots();

  useEffect(() => {
    getVehicle();
    getStationById(id);
    getSpotsByStationId(id);
  }, [station?.id]);

  console.log(spots);

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Cột trái */}
      <div className="lg:col-span-1 bg-white rounded-2xl shadow p-4">
        <img
          src={station?.image}
          alt={station?.name}
          className="w-full h-52 object-cover rounded-xl"
        />
        <h2 className="text-xl font-bold mt-3">{station?.name}</h2>
        <p className="text-gray-600">{station?.location}</p>

        <div className="flex items-center mt-2">
          <span className="text-green-600 font-medium">
            {station?.availableSpots > 0 ? "Còn trống" : "Hết chỗ"}
          </span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-gray-600">
            {station?.bookingAvailable} /{" "}
            {station?.bookingAvailable + station?.availableSpots} cổng sạc
          </span>
        </div>

        <h3 className="font-semibold mt-4">
          Công suất: <span>{station?.powerCapacity} kW</span>
        </h3>
      </div>

      {/* Cột phải */}
      <div className="lg:col-span-2 space-y-4">
        {/* Giờ hoạt động & tình trạng */}
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
                    // Màu sắc trạng thái theo status
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

        {/* Lịch giờ */}
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

          <button
            onClick={() => setIsBookingOpen(true)}
            className="mt-4 !bg-green-600 text-white px-4 py-2 rounded-md hover:!bg-green-700 transition"
          >
            Bắt đầu đặt chỗ
          </button>
        </div>

        {/* Đặt chỗ */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="font-semibold mb-3">Đặt chỗ của bạn</h3>
          <div className="text-sm space-y-1">
            <p>
              <strong>Trạm sạc:</strong> {station?.name}
            </p>
            <p>
              <strong>Slot:</strong> A1 – Thời gian: 14:30 - 14:45
            </p>
            <p>
              <strong>Xe:</strong> (chưa nhập)
            </p>
          </div>

          {/* Thanh tiến trình */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-red-600">📍 Vị trí hiện tại</span>
            </div>
            <div className="text-center flex-1 border-t-2 border-dashed mx-2 border-gray-300 relative">
              <span className="absolute left-1/2 -translate-x-1/2 text-gray-500 text-xs">
                1.5 KM
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-600">⚡ Trạm sạc</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-3">
            Lưu ý: Đặt chỗ có hiệu lực trong{" "}
            <span className="text-green-600">29:57</span>.
          </p>
        </div>
      </div>
      {isBookingOpen && (
        <div className="fixed inset-0 bg-transparent bg-opacity-40 flex items-center justify-center z-50 mt-70">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg animate-fadeIn">
            <h3 className="text-lg font-semibold mb-4">
              Đặt chỗ – {station?.name}
            </h3>

            <div className="space-y-3">
              {/* Thời gian */}
              <div>
                <label className="text-sm font-medium block mb-1">
                  Thời gian
                </label>
                <input
                  type="datetime-local"
                  className="border w-full px-3 py-2 rounded-md"
                  defaultValue="2025-09-22T10:00"
                />
              </div>

              {/* Xe */}
              <div>
                <label className="text-sm font-medium block mb-1">
                  Chọn xe của bạn
                </label>
                <select className="border w-full px-3 py-2 rounded-md">
                  <option value="">-- Chọn xe --</option>
                  {vehicle?.map((v) => (
                    <option key={v.id}>{v?.model?.modelName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">
                  Thời lượng (phút)
                </label>
                <input
                  type="number"
                  min="15"
                  max="120"
                  defaultValue="30"
                  className="border w-full px-3 py-2 rounded-md"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setIsBookingOpen(false)}
                className="px-4 py-2 rounded-md border hover:!bg-gray-50"
              >
                Hủy
              </button>
              <button className="px-4 py-2 !bg-green-600 text-white rounded-md hover:!bg-green-700">
                Đặt chỗ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StationDetail;
