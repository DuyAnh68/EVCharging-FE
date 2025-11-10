import React, { useEffect, useState } from "react";
import useInvoice from "../../hooks/useInvoice";
import DriverChargeHistory from "./DriverChargeHistory";

const DriverPopup = ({ id, vehicleId, onClose }) => {
  const { getInvoiceByUserId, loading, error } = useInvoice();
  const [invoices, setInvoices] = useState([]);
  const [activeTab, setActiveTab] = useState("invoice"); // "invoice" or "history"

  // Hàm format ngày & tiền
  const formatDate = (isoDate) =>
    new Date(isoDate).toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatMoney = (amount) =>
    amount?.toLocaleString("vi-VN") + " đ";

  // Lấy danh sách hóa đơn của tài xế khi id thay đổi
  useEffect(() => {
    const fetchInvoices = async () => {
      if (!id) return;
      try {
        const response = await getInvoiceByUserId(id);
        console.log("Invoices:", response);
        if (response) setInvoices(response);
      } catch (e) {
        console.error("Error fetching invoices:", e);
      }
    };
    fetchInvoices();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-6xl shadow-2xl relative animate-fadeIn overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#00B35C] to-[#009951] px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Thông tin tài xế
            </h2>
            <p className="text-white/80 text-sm mt-1">
              Chi tiết thông tin của tài xế #{id}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center transition"
            aria-label="Đóng"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            onClick={() => setActiveTab("invoice")}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-all ${
              activeTab === "invoice"
                ? "text-[#00B35C] border-b-2 border-[#00B35C] bg-white"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Hóa đơn
            </div>
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-all ${
              activeTab === "history"
                ? "text-[#00B35C] border-b-2 border-[#00B35C] bg-white"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Lịch sử sạc
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "invoice" ? (
            <>
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#00B35C]"></div>
                  <p className="ml-3 text-gray-600">Đang tải hóa đơn...</p>
                </div>
              )}
              
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              {!loading && !error && (
                <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                  <div className="overflow-x-auto max-h-[450px] overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Thời gian
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Giảm giá
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Tổng tiền
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Thành tiền
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {invoices?.length > 0 ? (
                          invoices.map((invoice, idx) => (
                            <tr 
                              key={invoice.id || idx} 
                              className="hover:bg-blue-50/50 transition-colors"
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <div className="flex items-center">
                                  <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  {formatDate(invoice.session.startTime)}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                  {invoice.subscriptionPlan?.discount
                                    ? `${invoice.subscriptionPlan.discount}%`
                                    : "0%"}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {formatMoney(invoice.session.totalCost)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#00B35C]">
                                {formatMoney(invoice.finalCost)}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="px-6 py-16 text-center">
                              <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <p className="mt-3 text-sm text-gray-500">
                                Không có hóa đơn nào cần hiển thị
                              </p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          ) : (
            <DriverChargeHistory vehicleId={vehicleId} />
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition shadow-sm"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverPopup;
