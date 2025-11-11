import React, { useEffect, useState } from "react";
import useSession from "../../hooks/useSession";

function ChargeHistory({ vehicleId }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState(null);
  const { getVehicleSession } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getVehicleSession(vehicleId);
        console.log("session", response);

        if (response) {
          setSessionData(response);
          setHistory(response);
        }
      } catch (e) {
        console.log("Error:", e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [vehicleId]);

  const formatDate = (iso) => new Date(iso)?.toLocaleString("vi-VN");
  const formatMoney = (v) => v?.toLocaleString("vi-VN") + " đ";

  return (
    <div className="w-full">
      {/* Header chỉ còn tiêu đề */}
      {/* <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Lịch sử sạc xe</h2>
      </div> */}

      {loading ? (
        <p className="text-gray-500 text-center py-10">Đang tải dữ liệu...</p>
      ) : history.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          Chưa có lịch sử sạc nào.
        </p>
      ) : (
        <div className="overflow-x-auto max-h-[400px]">
          <table className="table-fixed w-full border border border-gray-500 rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-[#00B35C] text-white">
              <tr>
                <th className="px-3 py-2 border">Thời gian</th>
                <th className="px-3 py-2 border">Trạm</th>
                <th className="px-3 py-2 border">Cổng</th>
                <th className="px-3 py-2 border">Năng lượng (kWh)</th>
                <th className="px-3 py-2 border">Chi phí</th>
                <th className="px-3 py-2 border">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {history.map((item, idx) => (
                <tr
                  key={`${item?.startTime}-${idx}`}
                  className="hover:bg-gray-50"
                >
                  <td className="px-3 py-2 border">
                    {formatDate(item?.startTime)}
                  </td>
                  <td className="px-3 py-2 border">{item?.stationName}</td>
                  <td className="px-3 py-2 border">{item?.spotName}</td>
                  <td className="px-3 py-2 border">
                    {Math.round(item?.energyUsed)}
                  </td>
                  <td className="px-3 py-2 border">
                    {formatMoney(item?.totalCost)}
                  </td>
                  <td className="px-3 py-2 border">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        item?.status === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {item?.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ChargeHistory;
