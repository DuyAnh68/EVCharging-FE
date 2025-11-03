import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

function ChargeHistory({ vehicleId, onClose }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Giả lập API
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // Giả lập call API
      setTimeout(() => {
        setHistory([
          {
            datetime: "2025-10-31T14:23:00Z",
            station: "VinFast Station - Q1",
            connector: "CCS2",
            energy_kwh: 23.45,
            duration_min: 48,
            cost_vnd: 120000,
            status: "Completed",
          },
          {
            datetime: "2025-10-29T18:50:00Z",
            station: "GreenCharge - Q7",
            connector: "CCS2",
            energy_kwh: 18.2,
            duration_min: 38,
            cost_vnd: 90000,
            status: "Completed",
          },
        ]);
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
        <h2 className="text-xl font-semibold">Lịch sử sạc xe #{vehicleId}</h2>
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