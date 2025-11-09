import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlugZap } from "lucide-react"; // icon đẹp từ lucide-react
import useSpots from "../../hooks/useSpot";
import useStaff from "../../hooks/useStaff";

const StationSpot = () => {
  const { id } = useParams();
  const { stationSpots, loading, error, getSpotsByStationId } = useSpots();
  const [filteredSpots, setFilteredSpots] = useState([]);
  const [filterType, setFilterType] = useState("ALL");
  const [showPopover, setShowPopover] = useState(false);

  const { startSessionStaff, endSessionStaff } = useStaff();
  const [sessionStart, setSessionStart] = useState(null);
  const [sessionEnd, setSessionEnd] = useState(null);
  const [activePopoverId, setActivePopoverId] = useState(null);
  const [batteryLevels, setBatteryLevels] = useState({});

  const handleStartSession = async (startData) => {
    try {
      const response = await startSessionStaff(startData);
      console.log("data", startData);
      console.log("response", response);
      if (response) {
        // Handle successful start session
        setSessionStart((prev) => ({ ...prev, [startData.spotId]: response }));
      }
    } catch (error) {
      console.error("Error starting session:", error);
    }
  };

  const handleEndSession = async (sessionId, endData) => {
    console.log("sessionId");
    console.log("end data", endData);
    try {
      const response = await endSessionStaff(sessionId, endData);
      if (response) {
        // Handle successful end session
        setSessionEnd(response);
      }
    } catch (error) {
      console.error("Error ending session:", error);
    }
  };

  useEffect(() => {
    const fetchSpots = async () => {
      await getSpotsByStationId(id);
    };
    fetchSpots();
  }, [id]);

  useEffect(() => {
    if (stationSpots && stationSpots.length > 0) {
      if (filterType === "ALL") setFilteredSpots(stationSpots);
      else
        setFilteredSpots(
          stationSpots.filter((spot) => spot.spotType === filterType)
        );
    }
  }, [stationSpots, filterType]);

  if (loading)
    return (
      <div className="text-center mt-10 text-gray-600">Đang tải dữ liệu...</div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        Lỗi khi tải dữ liệu: {error}
      </div>
    );

  return (
    <div className="bg-[#F6FAF7] flex flex-col min-h-screen px-6 py-10">
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="!text-[#14AE5C] text-4xl font-extrabold mb-6 tracking-tight">
          Quản lý trạm sạc
        </h1>

        {/* Bộ lọc */}
        <div className="flex gap-3 mb-8 justify-end">
          {["ALL", "BOOKING", "WALK_IN"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all shadow-sm
                ${
                  filterType === type
                    ? "bg-[#14AE5C] text-white border-[#14AE5C]"
                    : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
                }`}
            >
              {type === "ALL"
                ? "Tất cả"
                : type === "BOOKING"
                ? "Đặt chỗ"
                : "Vãng lai"}
            </button>
          ))}
        </div>

        {/* Bảng danh sách */}
        {filteredSpots.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            Không có spot nào thuộc loại {filterType}.
          </div>
        ) : (
          <div className="overflow-x-auto shadow-lg rounded-2xl bg-white border border-gray-200">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-[#14AE5C] text-white text-sm uppercase">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">ID</th>
                  <th className="px-6 py-3 text-left font-semibold">
                    Tên Spot
                  </th>
                  <th className="px-6 py-3 text-center font-semibold">
                    Công suất (kW)
                  </th>
                  <th className="px-6 py-3 text-center font-semibold">
                    Loại Spot
                  </th>
                  <th className="px-6 py-3 text-center font-semibold">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-center font-semibold">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSpots.map((spot, index) => (
                  <tr
                    key={spot.id}
                    className={`transition-all duration-200 hover:bg-[#EAF6EE] ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="px-6 py-4">{spot.id}</td>
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {spot.spotName}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {spot.powerOutput}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          spot.spotType === "BOOKING"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {spot.spotType === "BOOKING" ? "Đặt chỗ" : "Vãng lai"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          spot.status === "AVAILABLE"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {spot.status === "AVAILABLE"
                          ? "Sẵn sàng"
                          : "Đang bận / Bảo trì"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {spot.spotType === "WALK_IN" && (
                        <div className="relative inline-block">
                          <button
                            onClick={() => {
                              if (!batteryLevels[spot.id]) {
                                const randomBattery =
                                  Math.floor(Math.random() * (60 - 5 + 1)) + 5; // random 5–60
                                setBatteryLevels((prev) => ({
                                  ...prev,
                                  [spot.id]: randomBattery,
                                }));
                              }
                              setActivePopoverId(spot.id);
                              setTimeout(() => setActivePopoverId(null), 2000);
                            }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow transition ${
                              spot.status === "OCCUPIED"
                                ? "bg-red-600 hover:bg-red-700 text-white"
                                : "bg-[#14AE5C] hover:bg-[#0f954f] text-white"
                            }`}
                          >
                            <PlugZap size={16} />
                            {spot.status === "OCCUPIED"
                              ? "Dừng"
                              : "Bắt đầu sạc"}
                          </button>
                          <td className="px-6 py-4 text-center">
                            {spot.spotType === "WALK_IN" && (
                              <div className="relative inline-block">
                                <button
                                  onClick={() => {
                                    if (!batteryLevels[spot.id]) {
                                      const randomBattery =
                                        Math.floor(
                                          Math.random() * (60 - 5 + 1)
                                        ) + 5; // random 5–60
                                      setBatteryLevels((prev) => ({
                                        ...prev,
                                        [spot.id]: randomBattery,
                                      }));
                                    }
                                    setActivePopoverId(spot.id);
                                    setTimeout(
                                      () => setActivePopoverId(null),
                                      2000
                                    );
                                  }}
                                  className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow transition ${
                                    spot.status === "OCCUPIED"
                                      ? "bg-red-600 hover:bg-red-700 text-white"
                                      : "bg-[#14AE5C] hover:bg-[#0f954f] text-white"
                                  }`}
                                >
                                  <PlugZap size={16} />
                                  {spot.status === "OCCUPIED"
                                    ? "Dừng"
                                    : "Bắt đầu sạc"}
                                </button>

                                {activePopoverId === spot.id && (
                                  <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 text-sm text-gray-700 p-3">
                                    <p>Thông tin sạc</p>
                                    <div>
                                      <p>
                                        Pin hiện tại của xe:{" "}
                                        <span className="font-bold text-green-700">
                                          {batteryLevels[spot.id] || "..."}
                                        </span>
                                        %
                                      </p>
                                    </div>
                                    <button
                                      onClick={() => {
                                        if (spot.status === "OCCUPIED") {
                                          // Dừng session
                                          const session =
                                            sessionStart[spot.id``];
                                          if (!session) return; // kiểm tra phòng trường hợp null

                                          const endData = {
                                            ratePerKWh: 4500,
                                            batteryCapacity: 80,
                                            percentBefore:
                                              batteryLevels[spot.id] || 10,
                                          };
                                          handleEndSession(
                                            session.sessionId,
                                            endData
                                          );

                                          // xóa session khi kết thúc
                                          setSessionStart((prev) => ({
                                            ...prev,
                                            [spot.id]: null,
                                          }));
                                        } else {
                                          // Bắt đầu session
                                          const startData = {
                                            spotId: spot.id,
                                            percentBefore:
                                              batteryLevels[spot.id] || 10,
                                          };
                                          handleStartSession(startData);
                                        }
                                      }}
                                      className={`mt-2 w-full py-1 rounded-lg text-sm ${
                                        spot.status === "OCCUPIED"
                                          ? "bg-red-600 text-white hover:bg-red-700"
                                          : "bg-[#008236] text-white hover:bg-[#006b1b]"
                                      }`}
                                    >
                                      {spot.status === "OCCUPIED"
                                        ? "Dừng sạc"
                                        : "Sạc ngay"}
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </td>

                          {activePopoverId === spot.id && (
                            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 text-sm text-gray-700 p-3">
                              <p>Thông tin sạc</p>
                              <div>
                                <p>
                                  Pin hiện tại của xe:{" "}
                                  <span className="font-bold text-green-700">
                                    {batteryLevels[spot.id] || "..."}
                                  </span>
                                  %
                                </p>
                              </div>
                              <button
                                onClick={() => {
                                  if (spot.status === "OCCUPIED") {
                                    // Dừng session
                                    const session = sessionStart[spot.id];
                                    if (!session) return;

                                    const endData = {
                                      ratePerKWh: 4500,
                                      batteryCapacity: 80,
                                      percentBefore:
                                        batteryLevels[spot.id] || 10,
                                    };
                                    handleEndSession(
                                      session.sessionId,
                                      endData
                                    );

                                    setSessionStart((prev) => ({
                                      ...prev,
                                      [spot.id]: null,
                                    }));
                                  } else {
                                    const startData = {
                                      spotId: spot.id,
                                      percentBefore:
                                        batteryLevels[spot.id] || 10,
                                    };
                                    handleStartSession(startData);
                                  }
                                }}
                                className={`mt-2 w-full py-1 rounded-lg text-sm ${
                                  spot.status === "OCCUPIED"
                                    ? "bg-red-600 text-white hover:bg-red-700"
                                    : "bg-[#008236] text-white hover:bg-[#006b1b]"
                                }`}
                              >
                                {spot.status === "OCCUPIED"
                                  ? "Dừng sạc"
                                  : "Sạc ngay"}
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StationSpot;
