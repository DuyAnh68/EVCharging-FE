import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import useBooking from "../../hooks/useBooking";
import { useAuth } from "../../hooks";
import usePayment from "../../hooks/usePayment";

const BookingSchedule = () => {
  const {
    stationBookings,
    loading,
    error,
    fetchBookingsByStationId,
    postBooking,
    bookingPayment,
  } = useBooking();
  const { user } = useAuth();
  const location = useLocation();
  const { stationId, vehicle } = location.state;
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedSlots, setSelectedSlots] = useState([]);
  const { createPayment } = usePayment();

  useEffect(() => {
    if (stationId) fetchBookingsByStationId(stationId);
  }, []);

  // Tạo danh sách 48 slot (30 phút/slot)
  const slots = useMemo(() => {
    const result = [];
    for (let h = 0; h < 24; h++) {
      result.push(`${String(h).padStart(2, "0")}:00`);
      result.push(`${String(h).padStart(2, "0")}:30`);
    }
    return result;
  }, []);

  // Kiểm tra slot đã bị đặt chưa
  const isSlotBooked = (slotTime) => {
    if (!stationBookings) return false;
    const slotDateTime = new Date(`${selectedDate}T${slotTime}:00`);
    return stationBookings.some((b) => {
      const start = new Date(b.timeToCharge);
      const end = new Date(b.endTime);
      return slotDateTime >= start && slotDateTime < end;
    });
  };

  // Chọn slot liên tiếp
  const handleSelectSlot = (time) => {
    if (selectedSlots.length === 0) {
      setSelectedSlots([time]);
      return;
    }

    if (selectedSlots.includes(time)) {
      setSelectedSlots(selectedSlots.filter((t) => t !== time));
      return;
    }

    const lastSlot = selectedSlots[selectedSlots.length - 1];
    const lastIndex = slots.indexOf(lastSlot);
    const newIndex = slots.indexOf(time);

    if (Math.abs(newIndex - lastIndex) === 1) {
      const sorted = [...selectedSlots, time].sort(
        (a, b) => slots.indexOf(a) - slots.indexOf(b)
      );
      setSelectedSlots(sorted);
    } else {
      setSelectedSlots([time]);
    }
  };

  // Lấy thời gian bắt đầu và kết thúc
  const getStartEndTime = () => {
    if (selectedSlots.length === 0) return null;
    const sorted = [...selectedSlots].sort(
      (a, b) => slots.indexOf(a) - slots.indexOf(b)
    );
    const start = sorted[0];
    const endIndex = slots.indexOf(sorted[sorted.length - 1]) + 1;
    const end = endIndex < slots.length ? slots[endIndex] : "24:00";
    return { start, end };
  };

  const handleBooking = async () => {
    const { start, end } = getStartEndTime();
    console.log(new Date(`${selectedDate}T${start}:00`).toISOString());
    console.log(end);
    const bookingData = {
      userId: user.user.id,
      stationId: Number(stationId),
      vehicleId: vehicle.id,
      timeToCharge: `${selectedDate}T${start}:00`,
      endTime: `${selectedDate}T${end}:00`,
    };
    const res = await postBooking(bookingData);
    console.log(res);
    const paymentRes = await bookingPayment(res.bookingId);
    console.log("Payment Response:", paymentRes);
    const paymentVNPayUrl = await createPayment(paymentRes.result.id);
    console.log(paymentVNPayUrl);
    alert("Đặt chỗ thành công!");
    window.open(paymentVNPayUrl.paymentUrl, "_blank");
  };

  if (loading)
    return <p className="text-center text-gray-500">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-center text-red-500">Lỗi: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-2xl mt-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
        Đặt lịch sạc cho xe {vehicle?.name || ""}
      </h2>

      {/* chọn ngày */}
      <div className="flex justify-center mb-6">
        <input
          type="date"
          className="border rounded-md px-4 py-2 shadow-sm hover:shadow-md transition"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setSelectedSlots([]);
          }}
        />
      </div>

      {/* danh sách slot */}
      <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 gap-3">
        {slots.map((time, idx) => {
          const booked = isSlotBooked(time);
          const isSelected = selectedSlots.includes(time);
          return (
            <button
              key={idx}
              disabled={booked}
              onClick={() => handleSelectSlot(time)}
              className={`border rounded-md py-2 text-sm transition-all duration-150
                ${
                  booked
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : isSelected
                    ? "bg-green-600 text-white scale-105"
                    : "hover:bg-green-50"
                }`}
            >
              {time}
            </button>
          );
        })}
      </div>

      {/* Thông tin slot được chọn */}
      {selectedSlots.length > 0 && (
        <div className="mt-8 text-center space-y-2">
          <p>
            Bạn đã chọn từ{" "}
            <span className="font-semibold text-green-600">
              {getStartEndTime().start} – {getStartEndTime().end}
            </span>{" "}
            ngày {selectedDate}
          </p>
          <p className="text-sm text-gray-500">
            Tổng thời lượng: {selectedSlots.length * 30} phút
          </p>

          <button
            onClick={handleBooking}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
            disabled={selectedSlots.length === 0}
          >
            Tiến hành đặt chỗ
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingSchedule;
