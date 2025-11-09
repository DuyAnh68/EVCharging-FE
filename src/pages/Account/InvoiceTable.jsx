import React, { useEffect, useState } from "react";

  
const InvoiceTable = ({ invoices }) => {
  // Chỉ lấy hóa đơn có trạng thái PENDING hoặc PAID
  const filteredInvoices = invoices?.filter(
    (invoice) => invoice.status === "PENDING" || invoice.status === "PAID"
  );

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUserId(userData.id);
      console.log("user,", userData.id);
    }
  }, []);

  console.log("object", userId);

  const formatDate = (isoDate) =>
    isoDate
      ? new Date(isoDate).toLocaleString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-";

  const formatMoney = (amount) =>
    amount
      ? amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      : "-";

  const translateStatus = (status) => {
    switch (status) {
      case "PAID":
        return { label: "Đã thanh toán", color: "bg-green-100 text-green-700" };
      case "PENDING":
        return {
          label: "Chờ thanh toán",
          color: "bg-yellow-100 text-yellow-700",
        };
      default:
        return { label: status, color: "bg-gray-100 text-gray-600" };
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-100 mt-10 max-h-[400px] overflow-y-auto">
      <table className="min-w-full text-sm text-gray-700">
        {/* Header */}
        <thead className="bg-[#00B35C] text-white text-left">
          <tr>
            <th className="px-6 py-3 rounded-tl-2xl">Thời gian</th>
            {/* <th className="px-6 py-3">Thời lượng</th> */}
            <th className="px-6 py-3">Giảm giá</th>
            <th className="px-6 py-3">Tổng tiền</th>
            <th className="px-6 py-3">Thành tiền</th>
            <th className="px-6 py-3 rounded-tr-2xl text-center">Trạng thái</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-gray-100">
          {filteredInvoices?.length > 0 ? (
            filteredInvoices.map((invoice) => {
              const statusInfo = translateStatus(invoice.status);
              return (
                <tr
                  key={invoice.id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-6 py-4">
                    {formatDate(invoice.session.startTime)}
                  </td>
                  {/* <td className="px-6 py-4">
                    {Math.round(invoice.session.chargingDuration * 60)} phút
                  </td> */}
                  <td className="px-6 py-4">
                    {invoice.subscriptionPlan?.discount
                      ? `${invoice.subscriptionPlan.discount}%`
                      : "0%"}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {formatMoney(invoice.session.totalCost)}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {formatMoney(invoice.finalCost)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${statusInfo.color}`}
                    >
                      {statusInfo.label}
                    </span>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan="6"
                className="py-10 text-center text-gray-500 text-sm"
              >
                Không có hóa đơn nào cần hiển thị
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
