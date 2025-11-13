import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSpots from "../../hooks/useSpot";
import useStation from "../../hooks/useStation";
import useBooking from "../../hooks/useBooking";
import dayjs from "dayjs";

const StationSpot = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    spots,
    loading: spotsLoading,
    error: spotsError,
    getSpotsByStationId,
  } = useSpots();
  const {
    station,
    loading: stationLoading,
    error: stationError,
    getStationById,
  } = useStation();
  const {
    stationBookings,
    loading: bookingsLoading,
    error: bookingsError,
    fetchBookingsByStationId,
  } = useBooking();

  useEffect(() => {
    if (id) {
      getStationById(id);
      getSpotsByStationId(id);
      fetchBookingsByStationId(id);
    }
  }, [id]);

  console.log(spots);

  const availableSpots = spots.filter(
    (spot) => spot.status === "AVAILABLE" && spot.spotType === "WALK_IN"
  );

  console.log(stationBookings);

  if (stationLoading || spotsLoading || bookingsLoading) {
    return (
      <div className="text-center mt-10 text-gray-600">Đang tải dữ liệu...</div>
    );
  }

  if (stationError || spotsError || bookingsError) {
    return (
      <div className="text-center mt-10 text-red-500">
        Lỗi khi tải dữ liệu: {stationError || spotsError || bookingsError}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen px-6">
      <div className="max-w-6xl mx-auto w-full">
        {/* Station Info Section */}
        {station && (
          <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {station.name}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">
                  <span className="font-medium">Địa chỉ:</span>{" "}
                  {station.location}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Công suất:</span>{" "}
                  {station.powerCapacity} kW
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Trạng thái:</span>{" "}
                  <span
                    className={
                      station.status === "AVAILABLE"
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    {station.status === "AVAILABLE"
                      ? "Đang hoạt động"
                      : "Ngưng hoạt động"}
                  </span>
                </p>
              </div>
              <div className="h-40 md:h-full">
                <img
                  src={
                    station.imageUrl ||
                    "https://greencharge.vn/wp-content/uploads/2023/04/greencharge-38.jpg"
                  }
                  alt={station.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        {/* Spots Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Điểm sạc cho khách vãng lai
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableSpots.map((spot) => (
              <div
                onClick={() => navigate(`/staff/charging/${spot.id}`)}
                key={spot.id}
                className="border border-gray-200 bg-white rounded-xl p-4 shadow-sm hover:border-[#14AE5C] hover:shadow-lg transition-all duration-300 hover:cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {spot.spotName}
                </h3>
                <div className="mt-2 space-y-2">
                  <p className="text-sm text-gray-600">
                    Công suất: {spot.powerOutput} kW
                  </p>
                  <p className="text-sm">
                    Trạng thái:{" "}
                    <span
                      className={`font-medium ${
                        spot.status === "AVAILABLE"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {spot.status === "AVAILABLE"
                        ? "Có sẵn"
                        : "Không khả dụng"}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bookings Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Lịch đặt trạm
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thời gian bắt đầu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thời gian kết thúc
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stationBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{booking.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {dayjs(booking.timeToCharge).format("HH:mm DD/MM/YYYY")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {dayjs(booking.endTime).format("HH:mm DD/MM/YYYY")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : booking.status === "CONFIRMED"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {booking.status === "PENDING"
                          ? "Chờ thanh toán"
                          : booking.status === "CONFIRMED"
                          ? "Đã xác nhận"
                          : booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationSpot;
