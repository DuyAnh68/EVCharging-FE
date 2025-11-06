import { useNavigate, useParams } from "react-router-dom";
import useBooking from "../../hooks/useBooking";
import { useEffect, useState } from "react";
import { BatteryCharging, Clock, PlugZap, Zap } from "lucide-react";
import dayjs from "dayjs";
import useSpots from "../../hooks/useSpot";
import useStation from "../../hooks/useStation";
import useVehicle from "../../hooks/useVehicle";
import useSession from "../../hooks/useSession"; // Add this import
import { set } from "date-fns";
import useInvoice from "../../hooks/useInvoice";

const SessionDetail = () => {
  const { id } = useParams();
  const { getBookingById } = useBooking();
  const [booking, setBooking] = useState(null);
  const [chargingPointId, setChargingPointId] = useState("");
  const [isCharging, setIsCharging] = useState(false);
  const { startSession, endSession } = useSession();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [powerUse, setPowerUse] = useState(0); // kWh consumed
  const [percentBefore, setPercentBefore] = useState(null);
  const [currentPercent, setCurrentPercent] = useState(null);
  const [isVehicleConnected, setIsVehicleConnected] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const { getInvoiceBySessionId, postInvoiceById } = useInvoice();
  const navigate = useNavigate();

  // format HH:MM:SS
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}:${String(s).padStart(2, "0")}`;
  };

  const handleStart = async () => {
    if (!chargingPointId) {
      alert("Vui lòng chọn trụ sạc trước.");
      return;
    }
    if (!isVehicleConnected) {
      alert("Vui lòng kết nối xe trước khi bắt đầu sạc.");
      return;
    }

    const selectedSpot = spots?.find(
      (p) =>
        String(p.id) === String(chargingPointId) ||
        p.spotName === chargingPointId
    );

    if (!selectedSpot) {
      alert("Không tìm thấy trụ sạc đã chọn.");
      return;
    }

    const startData = {
      spotId: selectedSpot.id,
      percentBefore: percentBefore ?? 0,
    };

    try {
      const res = await startSession(id, startData);
      if (res) {
        setSessionId(res.sessionId);
        setIsCharging(true);
        setElapsedTime(0);
        setPowerUse(0);

        const batteryCapacity =
          Number(vehicleById?.model?.batteryCapacity) > 0
            ? Number(vehicleById.model.batteryCapacity)
            : 1;

        const initialPercent =
          percentBefore != null
            ? Number(percentBefore)
            : Number(vehicleById?.batteryPercentage ?? 0);

        setCurrentPercent(Math.min(100, initialPercent));

        const powerKw = Number(selectedSpot.powerOutput) || 0; // kW
        const kWhPerSecond = powerKw / 3600; // kWh gained per second
        const percentPerSecond = (kWhPerSecond / batteryCapacity) * 100; // percent gained per second

        if (timerInterval) {
          clearInterval(timerInterval);
        }

        const interval = setInterval(() => {
          setElapsedTime((prev) => prev + 1);
          setPowerUse((prevKwh) => {
            const nextKwh = prevKwh + kWhPerSecond;
            // update percent based on incremental kWh (avoid re-calculating from total for precision)
            setCurrentPercent((prevPercent) =>
              Math.min(
                100,
                Math.round((prevPercent + percentPerSecond) * 10) / 10
              )
            );
            return Math.round(nextKwh * 10000) / 10000;
          });
        }, 1000);

        setTimerInterval(interval);
      }
    } catch (err) {
      console.error(err);
      alert("Bắt đầu phiên sạc thất bại.");
    }
  };

  const handleEnd = async () => {
    const endData = {
      ratePerKWh: station?.pricePerKwh,
      batteryCapacity: vehicleById.model.batteryCapacity,
      percentBefore: percentBefore,
    };

    try {
      const response = await endSession(sessionId, endData);
      if (response) {
        console.log("Session ended successfully:", response);
        setIsCharging(false);
        const res = await getInvoiceBySessionId(sessionId);

        if (res) {
          console.log("res", res);
          const res1 = await postInvoiceById(res);
          console.log("res1", res1);
          if (res1) {
            navigate("/chargingSession");
          }
        }
      }
    } catch (error) {
      console.error("Error ending session:", error);
      alert("Failed to end the session. Please try again.");
    }
  };

  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  const { spots, getSpotsByStationId } = useSpots();
  const { getStationById, station } = useStation();
  const { vehicleById, getVehicleById } = useVehicle();

  const handleConnectVehicle = () => {
    setPercentBefore(Math.floor(Math.random() * 100));
    setIsVehicleConnected(true);
  };

  useEffect(() => {
    const fetchBookingDetail = async () => {
      try {
        const res = await getBookingById(id);
        if (res) setBooking(res);
      } catch (error) {
        console.error("Error fetching booking detail:", error);
      }
    };
    fetchBookingDetail();
  }, [id]);

  useEffect(() => {
    if (booking?.stationId) {
      getSpotsByStationId(booking.stationId);
      getStationById(booking.stationId);
    }
    if (booking?.vehicleId) {
      getVehicleById(booking.vehicleId);
    }
  }, [booking?.stationId]);

  console.log(vehicleById);

  // Add this function to filter available booking spots
  const getAvailableBookingSpots = () => {
    if (!spots) return [];
    return spots.filter(
      (spot) =>
        spot.spotType === "BOOKING" &&
        spot.status !== "UNAVAILABLE" &&
        spot.available
    );
  };

  if (!booking)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg">
        Đang tải thông tin đặt chỗ...
      </div>
    );

  return (
    <div className="min-h-screen px-4 py-6 flex flex-col items-center">
      {/* --- Header Booking Info --- */}
      <div className="w-full max-w-5xl mb-6">
        <h2 className="text-lg font-semibold text-gray-700">
          Trạm: {booking.stationName}
        </h2>
        <p className="text-sm text-gray-500">
          Bắt đầu: {dayjs(booking.timeToCharge).format("HH:mm, DD/MM/YYYY")}
        </p>
      </div>

      {/* --- Hai khối trên cùng hàng --- */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl mb-6">
        {/* --- Khối 1: Chọn trụ sạc --- */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm p-5 flex flex-col items-center justify-center">
          <h3 className="font-semibold text-gray-700 mb-2">Chọn trụ sạc</h3>

          {/* Spot Selection - First Step */}
          <select
            value={chargingPointId}
            onChange={(e) => setChargingPointId(e.target.value)}
            className="border border-gray-300 rounded-lg w-full text-center py-2 mb-4 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Chọn trụ sạc --</option>
            {getAvailableBookingSpots().map((spot) => (
              <option key={spot.id} value={spot.id}>
                {spot.spotName} - {spot.powerOutput}kW
              </option>
            ))}
          </select>

          {/* Connect Vehicle Button - Second Step */}
          <button
            onClick={handleConnectVehicle}
            disabled={!chargingPointId || isVehicleConnected}
            className={`w-full font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2 mb-4 
              ${
                !chargingPointId
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : isVehicleConnected
                  ? "bg-green-100 text-green-700 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
          >
            <PlugZap className="w-5 h-5" />
            {isVehicleConnected
              ? "Đã kết nối xe"
              : !chargingPointId
              ? "Vui lòng chọn trụ sạc"
              : "Kết nối xe"}
          </button>

          {/* Start Button - Final Step */}
          <button
            onClick={handleStart}
            disabled={!chargingPointId || !isVehicleConnected}
            className={`w-full font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2 
              ${
                chargingPointId && isVehicleConnected
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
          >
            <Zap className="w-5 h-5" />
            {!chargingPointId
              ? "Vui lòng chọn trụ sạc"
              : !isVehicleConnected
              ? "Vui lòng kết nối xe"
              : "Bắt đầu sạc"}
          </button>
        </div>

        {/* --- Khối 2: Thông tin phiên sạc --- */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm p-5">
          <h3 className="font-semibold text-gray-700 mb-3">
            Thông tin phiên sạc
          </h3>
          <div className="text-sm space-y-2">
            <p>
              <span className="text-gray-500">Trụ:</span>{" "}
              <span className="font-medium">#{chargingPointId}</span>
            </p>
            <p>
              <span className="text-gray-500">Giá (đ/kWh):</span>{" "}
              <span className="font-medium">
                {station?.pricePerKwh || "--"}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Tình trạng kết nối:</span>{" "}
              <span
                className={`font-medium ${
                  isVehicleConnected ? "text-green-600" : "text-gray-500"
                }`}
              >
                {isVehicleConnected ? "Đã kết nối" : "Chưa kết nối"}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Tốc độ sạc:</span>{" "}
              <span className="font-medium">{station?.powerCapacity} kWh</span>
            </p>
          </div>
        </div>
      </div>

      {/* --- Khối 3: Trạng thái sạc --- */}
      <div className="bg-white rounded-2xl shadow-sm p-5 w-full max-w-5xl">
        <h3 className="font-semibold text-gray-700 mb-3">Trạng thái sạc</h3>

        {/* Thông tin chính */}
        <div className="flex flex-wrap justify-between mb-3 text-sm text-gray-700">
          <div className="flex items-center gap-2 mb-2 md:mb-0">
            <BatteryCharging className="w-5 h-5 text-green-600" />
            <span>
              Mức pin:{" "}
              {currentPercent != null ? `${currentPercent.toFixed(1)}%` : "-"}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2 md:mb-0">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span>Công suất sạc: {station?.powerCapacity} </span>
          </div>
          <div className="flex items-center gap-2 mb-2 md:mb-0">
            <Clock className="w-5 h-5 text-blue-500" />
            <span>Thời gian sạc: {formatTime(elapsedTime)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">⚡</span>
            <span>Điện năng tiêu thụ: {powerUse.toFixed(4)} kWh</span>
          </div>
        </div>

        {/* Thanh tiến trình sạc */}
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-2 bg-green-500 transition-all duration-700`}
            style={{ width: `${currentPercent}%` }}
          ></div>
        </div>

        {/* Hiển thị phần trăm pin dưới thanh tiến trình */}
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>0%</span>
          <span>{currentPercent}%</span>
          <span>100%</span>
        </div>

        {/* Nút hành động */}
        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={handleEnd}
            className="bg-red-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-red-600"
          >
            Kết thúc sạc
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionDetail;
