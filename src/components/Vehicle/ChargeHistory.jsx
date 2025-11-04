import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import useSession from '../../hooks/useSession';

function ChargeHistory({ vehicleId, onClose }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState(null);
  const { getVehicleSession } = useSession();

  const handleGetSession = async () => {
    try{
      const response = await getVehicleSession(vehicleId);
      console.log("session", response);
      if(response){
        setSessionData(response);
      }

    }catch(e){
      console.log("Error:", e.message);
    }    
  };
  // Giả lập API
  useEffect(() => {
    const fetchData = async () => {
      try{
        await handleGetSession();
      }catch(e){
        console.log("Error:", e.message);
      }
      setLoading(true);
      // Giả lập call API
      setTimeout(() => {
        setHistory(sessionData || []);
        setLoading(false);
      }, 800);
    }
    fetchData();
  }, [vehicleId]);

  const formatDate = (iso) => new Date(iso).toLocaleString("vi-VN");
  const formatMoney = (v) => v.toLocaleString("vi-VN") + " đ";

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Lịch sử sạc xe</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-black"
          aria-label="Đóng"
        >
          <X size={20} />
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center py-10">Đang tải dữ liệu...</p>
      ) : history.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          Chưa có lịch sử sạc nào.
        </p>
      ) : (
        <div className="overflow-x-auto max-h-[400px]">
          <table className="min-w-full border">
            <thead className="bg-gray-100 text-sm sticky top-0 z-10">
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
                <tr key={`${item.datetime}-${idx}`} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border">{formatDate(item.datetime)}</td>
                  <td className="px-3 py-2 border">{item.station}</td>
                  <td className="px-3 py-2 border">{item.connector}</td>
                  <td className="px-3 py-2 border">{item.energy_kwh}</td>
                  <td className="px-3 py-2 border">{formatMoney(item.cost_vnd)}</td>
                  <td className="px-3 py-2 border">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        item.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {item.status}
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
};

export default ChargeHistory