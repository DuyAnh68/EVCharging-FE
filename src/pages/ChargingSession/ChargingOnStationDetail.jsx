import { useNavigate, useParams } from "react-router-dom";
import useSpots from "../../hooks/useSpot";
import { useEffect, useState } from "react";
import useStation from "../../hooks/useStation";
import { BatteryCharging, Clock, PlugZap, Zap } from "lucide-react";
import useVehicle from "../../hooks/useVehicle";
import useSession from "../../hooks/useSession";
import useInvoice from "../../hooks/useInvoice";

const ChargingOnStationDetail = () => {
  const stationId = useParams().id;
  const { getSpotsByStationId, stationSpots } = useSpots();
  const { getStationById, station } = useStation();
  const [chargingPointId, setChargingPointId] = useState("");
  const [isVehicleConnected, setIsVehicleConnected] = useState(false);
  const { getVehicle, vehicle, getVehicleById, vehicleById } = useVehicle();
  const [vehicleId, setVehicleId] = useState("");
  const [percentBefore, setPercentBefore] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const { startSessionOnStation, endSessionOnStation } = useSession();
  const [sessionId, setSessionId] = useState(null);
  const [isCharging, setIsCharging] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [powerUse, setPowerUse] = useState(0);
  const [currentPercent, setCurrentPercent] = useState(null);
  const [timerInterval, setTimerInterval] = useState(null);
  const [isEnding, setIsEnding] = useState(false);
  const [session, setSession] = useState(null);
  const { getInvoiceBySessionId, postInvoiceById } = useInvoice();
  const [showSummary, setShowSummary] = useState(false);
  const navigate = useNavigate();

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}:${String(s).padStart(2, "0")}`;
  };

  useEffect(() => {
    getSpotsByStationId(stationId);
    getStationById(stationId);
    getVehicle();
    getVehicleById(vehicleId);
  }, [stationId, vehicleId]);

  const handleConnectVehicle = () => {
    setPercentBefore(Math.floor(Math.random() * 100));
    setIsVehicleConnected(!isVehicleConnected);
  };

  const handleSaveInvoice = async () => {
    try {
      const res = await getInvoiceBySessionId(sessionId);
      if (res) {
        const res1 = await postInvoiceById(res);
        if (res1) {
          alert("Đã lưu hóa đơn thành công!");
          setShowSummary(false);
          navigate("/chargingSession");
        }
      }
    } catch (error) {
      console.error("Lỗi khi lưu hóa đơn:", error);
      alert("Không thể lưu hóa đơn. Vui lòng thử lại.");
    }
  };

  const getAvailableBookingSpots = () => {
    return stationSpots?.filter(
      (spot) => spot.status === "AVAILABLE" && spot.spotType === "WALK_IN"
    );
  };

  const getAvailableVehicles = () => {
    return vehicle?.filter(
      (veh) => veh.vehicleSubscriptionResponse.status === "ACTIVE"
    );
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

    const selectedSpot = stationSpots?.find(
      (p) => String(p.id) === String(chargingPointId)
    );

    if (!selectedSpot) {
      alert("Không tìm thấy trụ sạc đã chọn.");
      return;
    }

    const startData = {
      spotId: selectedSpot.id,
      userId: user.id,
      vehicleId: vehicleId,
      stationId: stationId,
      percentBefore: percentBefore ?? 0,
    };
    try {
      const res = await startSessionOnStation(startData);
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

        const powerKw = Number(selectedSpot.powerOutput) || 0;
        const kWhPerSecond = powerKw / 3600;

        if (timerInterval) {
          clearInterval(timerInterval);
        }

        const interval = setInterval(() => {
          setElapsedTime((prev) => prev + 1);

          setPowerUse((prevKwh) => {
            const nextKwh = prevKwh + kWhPerSecond;

            // Cập nhật % pin theo lượng điện nạp được
            const nextPercent =
              percentBefore + (nextKwh / batteryCapacity) * 100;

            setCurrentPercent(Math.min(100, Math.round(nextPercent * 10) / 10));

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
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setIsCharging(false);
    setIsEnding(true);

    const endData = {
      ratePerKWh: station?.pricePerKwh,
      batteryCapacity: vehicleById.model.batteryCapacity,
      percentBefore: percentBefore,
    };

    try {
      const response = await endSessionOnStation(sessionId, endData);
      console.log(response);
      if (response) {
        setSession(response);
        setShowSummary(true);
      }
    } catch (error) {
      console.error("Error ending session:", error);
      alert("Kết thúc phiên sạc thất bại. Vui lòng thử lại.");
    } finally {
      setIsEnding(false);
      setIsCharging(false);
    }
  };

  const availableVehicles = getAvailableVehicles();

  const availableSpots = getAvailableBookingSpots();

  return (
    <div className="min-h-screen px-4 py-6 flex flex-col items-center">
      <div className="w-full max-w-5xl mb-6">
        <h2 className="text-lg font-semibold text-gray-700">
          Trạm: {station?.stationName}
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl mb-6">
        <div className="flex-1 bg-white rounded-2xl shadow-sm p-5 flex flex-col items-center justify-center">
          <h3 className="font-semibold text-gray-700 mb-2">Chọn xe</h3>

          <select
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            className="border border-gray-300 rounded-lg w-full text-center py-2 mb-4 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Chọn xe --</option>
            {availableVehicles?.map((veh) => (
              <option key={veh.id} value={veh.id}>
                {veh?.model.brandName} {veh?.model.modelName} -{" "}
                {veh?.licensePlate}
              </option>
            ))}
          </select>

          <h3 className="font-semibold text-gray-700 mb-2">Chọn trụ sạc</h3>
          <select
            value={chargingPointId}
            onChange={(e) => setChargingPointId(e.target.value)}
            className="border border-gray-300 rounded-lg w-full text-center py-2 mb-4 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Chọn trụ sạc --</option>
            {availableSpots?.map((spot) => (
              <option key={spot.id} value={spot.id}>
                {spot.spotName} - {spot.powerOutput}kW
              </option>
            ))}
          </select>

          <button
            onClick={handleConnectVehicle}
            disabled={!chargingPointId || !vehicleId}
            className={`w-full font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2 mb-4 
              ${
                !chargingPointId || !vehicleId
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : isVehicleConnected
                  ? "bg-green-100 text-green-700 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
          >
            <PlugZap className="w-5 h-5" />
            {isVehicleConnected
              ? "Ngắt kết nối"
              : !chargingPointId
              ? "Vui lòng chọn trụ sạc"
              : "Kết nối xe"}
          </button>

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

        <div className="flex-1 bg-white rounded-2xl shadow-sm p-5">
          <h3 className="font-semibold text-gray-700 mb-3">
            Thông tin phiên sạc
          </h3>
          <div className="text-sm space-y-2">
            <p>
              <span className="text-gray">Trụ:</span>
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
                {isVehicleConnected
                  ? `Đã kết nối với xe ${vehicleById.model.brandName} ${vehicleById.model.modelName}`
                  : "Chưa kết nối"}
              </span>
            </p>
            <p>
              <span className="text-gray-500">Tốc độ sạc:</span>{" "}
              <span className="font-medium">{station?.powerCapacity} kWh</span>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-5 w-full max-w-5xl">
        <h3 className="font-semibold text-gray-700 mb-3">Trạng thái sạc</h3>

        {/* Thông tin chính */}
        <div className="flex flex-wrap justify-between mb-3 text-sm text-gray-700">
          <div className="flex items-center gap-2 mb-2 md:mb-0">
            <BatteryCharging className="w-5 h-5 text-green-600" />
            <span>
              Mức pin: {currentPercent != null ? `${currentPercent}%` : "-"}
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
            <span>Điện năng tiêu thụ: {powerUse} kWh</span>
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
      {showSummary && session && (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
              Thông tin phiên sạc
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="text-gray-500">Mã phiên:</span>{" "}
                <span className="font-medium">{session.sessionId}</span>
              </p>
              <p>
                <span className="text-gray-500">Thời lượng:</span>{" "}
                <span className="font-medium">{formatTime(elapsedTime)}</span>
              </p>
              <p>
                <span className="text-gray-500">Điện năng tiêu thụ:</span>{" "}
                <span className="font-medium">{powerUse} kWh</span>
              </p>
              <p>
                <span className="text-gray-500">Giá điện:</span>{" "}
                <span className="font-medium">
                  {station?.pricePerKwh} đ/kWh
                </span>
              </p>
              <p>
                <span className="text-gray-500">Tổng tiền:</span>{" "}
                <span className="font-semibold text-green-600">
                  {(session.totalCost || 0).toLocaleString()} đ
                </span>
              </p>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowSummary(false)}
                className="px-4 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Đóng
              </button>
              <button
                onClick={handleSaveInvoice}
                className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Lưu vào hóa đơn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChargingOnStationDetail;
