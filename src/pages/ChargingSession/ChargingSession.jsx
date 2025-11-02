import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useBooking from "../../hooks/useBooking";
import { useAuth } from "../../hooks";
import dayjs from "dayjs";
import { Clock, BatteryCharging, Info } from "lucide-react";

const ChargingSession = () => {
  const { getBookingByUserId } = useBooking();
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fetchUserBookings = async () => {
        setLoading(true);
        try {
          const res = await getBookingByUserId(user.user.id);
          setBookings(res || []);
          console.log("User Bookings:", res);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUserBookings();
    }
  }, [user]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-60 text-lg font-semibold text-gray-600">
        Đang tải dữ liệu...
      </div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
        <BatteryCharging className="text-green-600" size={28} />
        Lịch sử đặt sạc của bạn
      </h2>

      {bookings.length === 0 ? (
        <div className="mt-10 text-center text-gray-500">
          <Info className="mx-auto mb-2 text-gray-400" size={30} />
          <p>Không có phiên sạc nào được tìm thấy.</p>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto bg-white shadow-md rounded-xl border border-gray-100">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-3 text-left">Mã đặt</th>
                <th className="px-6 py-3 text-left">Trạng thái</th>
                <th className="px-6 py-3 text-left">Giờ bắt đầu</th>
                <th className="px-6 py-3 text-left">Giờ kết thúc</th>
                <th className="px-6 py-3 text-left">Thời gian sạc</th>
                <th className="px-6 py-3 text-left">Phí đặt chỗ</th>
                <th className="px-6 py-3 text-left">Tổng chi phí</th>
                <th className="px-6 py-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, index) => (
                <tr
                  key={b.id}
                  className={`border-t hover:bg-gray-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    #{b.id}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        b.status === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : b.status === "CONFIRMED"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {b.startTime
                      ? dayjs(b.startTime).format("HH:mm DD/MM/YYYY")
                      : "-"}
                  </td>
                  <td className="px-6 py-4">
                    {b.endTime
                      ? dayjs(b.endTime).format("HH:mm DD/MM/YYYY")
                      : "-"}
                  </td>
                  <td className="px-6 py-4 flex items-center gap-1">
                    <Clock size={16} className="text-gray-500" />
                    {b.timeToCharge
                      ? dayjs(b.timeToCharge).format("HH:mm DD/MM")
                      : "-"}
                  </td>
                  <td className="px-6 py-4">
                    {b.reservationFee
                      ? `${b.reservationFee.toLocaleString()}₫`
                      : "-"}
                  </td>
                  <td className="px-6 py-4">
                    {b.totalCost ? `${b.totalCost.toLocaleString()}₫` : "-"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => navigate(`/session-detail/${b.id}`)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ChargingSession;
