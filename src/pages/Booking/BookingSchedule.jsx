import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import useBooking from "../../hooks/useBooking";
import usePayment from "../../hooks/usePayment";
import useStation from "../../hooks/useStation";

const BookingSchedule = () => {
  const {
    stationBookings,
    loading,
    error,
    fetchBookingsByStationId,
    postBooking,
    bookingPayment,
  } = useBooking();
  const { getStationById, station } = useStation();

  const user = JSON.parse(localStorage.getItem("user"));

  const location = useLocation();
  const { stationId, vehicle } = location.state;
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedSlots, setSelectedSlots] = useState([]);
  const { createPayment } = usePayment();

  useEffect(() => {
    const fetchBooking = async () => {
      if (stationId) await fetchBookingsByStationId(stationId);
    };
    const fetchStation = async () => {
      if (stationId) await getStationById(stationId);
    };
    fetchBooking();
    fetchStation();
  }, []);

  console.log("station booking", stationBookings);
  console.log("station", station);

  const slots = useMemo(() => {
    const result = [];
    for (let h = 0; h < 24; h++) {
      result.push(`${String(h).padStart(2, "0")}:00`);
      result.push(`${String(h).padStart(2, "0")}:30`);
    }
    return result;
  }, []);

  const isSlotBooked = (slotTime) => {
    if (!stationBookings || !station) return false;

    const slotDateTime = new Date(`${selectedDate}T${slotTime}:00`);

    const bookingsAtSameTime = stationBookings.filter((b) => {
      const start = new Date(b.timeToCharge);
      const end = new Date(b.endTime);
      return slotDateTime >= start && slotDateTime < end;
    }).length;

    return bookingsAtSameTime >= station.totalSpotsOnline;
  };

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
      userId: user.id,
      stationId: Number(stationId),
      vehicleId: vehicle.id,
      timeToCharge: `${selectedDate}T${start}:00`,
      endTime: `${selectedDate}T${end}:00`,
    };

    const res = await postBooking(bookingData);
    console.log("bookingres:", res);
    if (res) {
      const paymentRes = await bookingPayment(res.bookingId);
      const paymentVNPayUrl = await createPayment(paymentRes.result.id);
      alert("Đặt chỗ thành công!");
      window.open(paymentVNPayUrl.paymentUrl, "_blank");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md">
          <div className="text-red-500 text-5xl mb-4 text-center">⚠️</div>
          <p className="text-center text-red-600 font-semibold text-lg">
            Lỗi: {error}
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 border border-emerald-100">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={512}
                height={512}
                viewBox="0 0 512 512"
              >
                <path fill="white" d="M376 211H256V16L136 301h120v195z"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Đặt lịch sạc xe điện
            </h2>
          </div>
        </div>

        {/* Date Picker Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6 border border-emerald-100">
          <div className="flex items-center justify-center gap-3">
            <span className="text-gray-700 font-semibold text-lg">
              Chọn ngày:
            </span>
            <input
              type="date"
              className="border-2 border-emerald-200 rounded-xl px-6 py-3 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-lg font-medium"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedSlots([]);
              }}
            />
          </div>
        </div>

        {/* Time Slots Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-emerald-100">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Chọn khung giờ sạc
            </h3>
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-emerald-500"></div>
                <span className="text-gray-600">Đã chọn</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gray-200"></div>
                <span className="text-gray-600">Đã đặt</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border-2 border-gray-300"></div>
                <span className="text-gray-600">Còn trống</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
            {slots.map((time, idx) => {
              const booked = isSlotBooked(time);
              const isSelected = selectedSlots.includes(time);
              return (
                <button
                  key={idx}
                  disabled={booked}
                  onClick={() => handleSelectSlot(time)}
                  className={`relative border-2 rounded-xl py-3 px-2 text-sm font-semibold transition-all duration-200 transform
                    ${
                      booked
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                        : isSelected
                        ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-emerald-600 shadow-lg scale-105 hover:scale-110"
                        : "bg-white text-gray-700 border-gray-300 hover:border-emerald-400 hover:bg-emerald-50 hover:scale-105 shadow-sm hover:shadow-md"
                    }`}
                >
                  {time}
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Summary Card */}
          {selectedSlots.length > 0 && (
            <div className="mt-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200">
              <div className="text-center space-y-3">
                <div className="inline-block bg-white px-6 py-3 rounded-xl shadow-md">
                  <p className="text-gray-700 text-lg">
                    Thời gian đã chọn:{" "}
                    <span className="font-bold text-emerald-600 text-xl">
                      {getStartEndTime().start} – {getStartEndTime().end}
                    </span>
                  </p>
                  <p className="text-gray-600 mt-1">
                    {" "}
                    {new Date(selectedDate).toLocaleDateString("vi-VN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 text-teal-700">
                  <p className="text-lg font-semibold">
                    Tổng thời lượng: {selectedSlots.length * 30} phút (
                    {(selectedSlots.length * 0.5).toFixed(1)} giờ)
                  </p>
                </div>

                <button
                  onClick={handleBooking}
                  className="mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                  disabled={selectedSlots.length === 0}
                >
                  Tiến hành đặt chỗ
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingSchedule;
