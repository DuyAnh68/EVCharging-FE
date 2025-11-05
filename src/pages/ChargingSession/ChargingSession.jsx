import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useBooking from "../../hooks/useBooking";
import dayjs from "dayjs";
import { Clock, BatteryCharging, Info } from "lucide-react";

const ChargingSession = () => {
  const { getBookingByUserId } = useBooking();
  const user = JSON.parse(localStorage.getItem("user"));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("ALL"); // ALL | PENDING | CONFIRMED | COMPLETED
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fetchUserBookings = async () => {
        setLoading(true);
        try {
          const res = await getBookingByUserId(user.id);
          setBookings(res || []);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUserBookings();
    }
  }, []);

  const counts = useMemo(() => {
    const c = { ALL: bookings.length, PENDING: 0, CONFIRMED: 0, COMPLETED: 0 };
    bookings.forEach((b) => {
      const s = b.status ?? "";
      if (s === "PENDING") c.PENDING++;
      else if (s === "CONFIRMED") c.CONFIRMED++;
      else if (s === "COMPLETED") c.COMPLETED++;
    });
    return c;
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    if (filterStatus === "ALL") return bookings;
    return bookings.filter((b) => b.status === filterStatus);
  }, [bookings, filterStatus]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-60 text-lg font-semibold text-gray-600">
        Đang tải dữ liệu...
      </div>
    );

  const getBookingId = (b) => b.id ?? b.bookingId;

  const renderActionButton = (b) => {
    const id = getBookingId(b);
    if (b.status === "PENDING") {
      return (
        <button
          onClick={() => navigate(`/payment/${id}`)}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          Thanh toán
        </button>
      );
    }

    return (
      <button
        onClick={() => navigate(`/session-detail/${id}`)}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
      >
        Xem chi tiết
      </button>
    );
  };

  const displayStatus = (s) =>
    s === "COMPLETED"
      ? "Hoàn thành"
      : s === "PENDING"
      ? "Chờ thanh toán"
      : s === "CONFIRMED"
      ? "Đã thanh toán"
      : s;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <BatteryCharging className="text-green-600" size={32} />
          <span>Lịch sử đặt sạc</span>
        </h2>
        <span className="text-sm text-gray-500 italic">
          Tổng số phiên: {bookings.length}
        </span>
      </div>

      {/* Bộ lọc trạng thái */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        {["ALL", "PENDING", "CONFIRMED", "COMPLETED"].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
              filterStatus === s
                ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {s === "ALL"
              ? `Tất cả (${counts.ALL})`
              : s === "PENDING"
              ? `Chờ thanh toán (${counts.PENDING})`
              : s === "CONFIRMED"
              ? `Đã thanh toán (${counts.CONFIRMED})`
              : `Hoàn thành (${counts.COMPLETED})`}
          </button>
        ))}
      </div>

      {/* Nếu không có dữ liệu */}
      {filteredBookings.length === 0 ? (
        <div className="mt-16 text-center text-gray-500">
          <div className="flex justify-center">
            <Info className="text-gray-400 mb-3" size={40} />
          </div>
          <p className="text-base font-medium">
            Không có phiên sạc nào phù hợp.
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Hãy đặt lịch sạc để bắt đầu trải nghiệm nhé!
          </p>
        </div>
      ) : (
        /* Bảng dữ liệu */
        <div className="mt-8 bg-white shadow-lg rounded-2xl border border-gray-100 overflow-hidden">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-gray-600 uppercase text-xs font-semibold">
                <th className="px-6 py-4 text-left">Mã đặt</th>
                <th className="px-15 py-4 text-left">Trạng thái</th>
                <th className="px-6 py-4 text-left">Bắt đầu</th>
                <th className="px-6 py-4 text-left">Kết thúc</th>
                <th className="px-6 py-4 text-left">Thời gian sạc</th>
                <th className="px-6 py-4 text-left">Phí đặt chỗ</th>
                <th className="px-6 py-4 text-left">Tổng chi phí</th>
                <th className="px-6 py-4 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((b, index) => {
                const bookingId = getBookingId(b);
                return (
                  <tr
                    key={bookingId}
                    className={`transition-all ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    } hover:bg-indigo-50`}
                  >
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      #{bookingId}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide ${
                          b.status === "COMPLETED"
                            ? "bg-green-100 text-green-700"
                            : b.status === "CONFIRMED"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {displayStatus(b.status)}
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

                    <td className="px-6 py-4 flex items-center gap-1 text-gray-600">
                      <Clock size={16} className="text-gray-400" />
                      {b.timeToCharge
                        ? dayjs(b.timeToCharge).format("HH:mm DD/MM")
                        : "-"}
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-700">
                      {b.reservationFee
                        ? `${b.reservationFee.toLocaleString()}₫`
                        : "-"}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {b.totalCost ? `${b.totalCost.toLocaleString()}₫` : "-"}
                    </td>

                    <td className="px-6 py-4 text-center">
                      {b.status === "PENDING" ? (
                        <button
                          onClick={() => navigate(`/payment/${bookingId}`)}
                          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md"
                        >
                          Thanh toán
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            navigate(`/session-detail/${bookingId}`)
                          }
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md"
                        >
                          Xem chi tiết
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ChargingSession;
