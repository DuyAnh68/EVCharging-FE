import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useBooking from "../../hooks/useBooking";
import dayjs from "dayjs";
import {
  BatteryCharging,
  Clock,
  MapPin,
  Car,
  Power,
  PlugZap,
} from "lucide-react";
import useVehicle from "../../hooks/useVehicle";

const SessionDetail = () => {
  const { id } = useParams();
  const { getBookingById } = useBooking();
  const [sessionDetail, setSessionDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chargerId, setChargerId] = useState("");
  const { getVehicleById } = useVehicle();
  const [vehicleInfo, setVehicleInfo] = useState(null);

  console.log(sessionDetail?.vehicleId);
  useEffect(() => {
    const fetchSessionDetail = async () => {
      setLoading(true);
      try {
        const res = await getBookingById(id);
        if (res) setSessionDetail(res);
      } catch (err) {
        console.error("Error fetching session detail:", err);
      } finally {
        setLoading(false);
      }
    };

    const getVehicleInfo = async (vehicleId) => {
      try {
        const vehicleData = await getVehicleById(vehicleId);
        setVehicleInfo(vehicleData);
      } catch (err) {
        console.error("Error fetching vehicle info:", err);
      } finally {
        setLoading(false);
      }
    };
  }, [id]);

  console.log(vehicleInfo);

  if (loading)
    return (
      <div className="flex justify-center items-center h-60 text-lg text-gray-600">
        Đang tải chi tiết phiên sạc...
      </div>
    );

  if (!sessionDetail)
    return (
      <div className="flex justify-center items-center h-60 text-gray-500">
        Không tìm thấy dữ liệu phiên sạc.
      </div>
    );

  const {
    bookingId,
    stationName,
    vehicleId,
    startTime,
    endTime,
    timeToCharge,
    status,
    reservationFee,
  } = sessionDetail;

  const handleStartSession = () => {
    if (!chargerId.trim()) {
      alert("⚠️ Vui lòng nhập ID trụ sạc tại trạm để bắt đầu.");
      return;
    }
    alert(`🔋 Phiên sạc #${bookingId} bắt đầu tại trụ ${chargerId}!`);
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-gradient-to-b from-white to-green-50 shadow-xl rounded-2xl p-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BatteryCharging className="text-green-600" size={30} />
          <h2 className="text-2xl font-bold text-gray-800">
            Phiên sạc #{bookingId}
          </h2>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            status === "CONFIRMED"
              ? "bg-yellow-100 text-yellow-700"
              : status === "COMPLETED"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Detail Info */}
      <div className="space-y-4 text-gray-700">
        <InfoRow icon={<MapPin />} label="Trạm sạc" value={stationName} />
        <InfoRow icon={<Car />} label="Xe ID" value={`#${vehicleId}`} />
        <InfoRow
          icon={<Clock />}
          label="Giờ bắt đầu"
          value={dayjs(startTime).format("HH:mm DD/MM/YYYY")}
        />
        <InfoRow
          icon={<Clock />}
          label="Thời gian sạc"
          value={dayjs(timeToCharge).format("HH:mm DD/MM/YYYY")}
        />
        <InfoRow
          icon={<Clock />}
          label="Kết thúc dự kiến"
          value={dayjs(endTime).format("HH:mm DD/MM/YYYY")}
        />
        <InfoRow
          icon={<Power />}
          label="Phí đặt chỗ"
          value={`${reservationFee?.toLocaleString()}₫`}
        />
      </div>

      {/* Charger Input */}
      <div className="mt-8 bg-white p-4 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <PlugZap className="text-green-600" size={20} />
          Nhập ID trụ sạc
        </h3>
        <p className="text-sm text-gray-500 mb-3">
          Vui lòng nhập mã trụ sạc bạn muốn sử dụng tại trạm.
        </p>
        <input
          type="text"
          placeholder="VD: CHR-105"
          value={chargerId}
          onChange={(e) => setChargerId(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
      </div>

      {/* Start Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleStartSession}
          disabled={status !== "CONFIRMED"}
          className={`w-full py-3 rounded-lg text-white font-semibold text-lg transition-all shadow-md ${
            status === "CONFIRMED"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          🚀 Bắt đầu sạc
        </button>
      </div>
    </div>
  );
};

// Small reusable info row
const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2">
    <div className="text-green-600">{icon}</div>
    <p className="text-sm">
      <span className="font-medium">{label}:</span>{" "}
      <span className="text-gray-800">{value || "-"}</span>
    </p>
  </div>
);

export default SessionDetail;
