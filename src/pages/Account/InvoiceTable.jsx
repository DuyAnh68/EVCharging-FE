import React from "react";

const InvoiceTable = ({ invoices }) => {
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
    amount ? amount.toLocaleString("vi-VN") + " đ" : "0 đ";

  if (!invoices || invoices.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>Không có hóa đơn nào</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-100">
      <table className="w-full text-sm text-gray-700">
        <thead className="bg-[#00B35C] text-white">
          <tr>
            <th className="py-3 px-4 text-left">Mã hóa đơn</th>
            <th className="py-3 px-4 text-left">Ngày lập</th>
            <th className="py-3 px-4 text-left">Gói đăng ký</th>
            <th className="py-3 px-4 text-center">Phí gói</th>
            <th className="py-3 px-4 text-center">Giảm giá</th>
            <th className="py-3 px-4 text-center">Thành tiền</th>
            <th className="py-3 px-4 text-center">Trạng thái</th>
            <th className="py-3 px-4 text-center">Ngày thanh toán</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr
              key={invoice.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-all duration-150"
            >
              <td className="py-3 px-4 font-medium text-gray-800">
                #{invoice.id}
              </td>
              <td className="py-3 px-4">{formatDate(invoice.issueDate)}</td>
              <td className="py-3 px-4">
                {invoice.subscriptionPlan?.name || "Không có"}
              </td>
              <td className="py-3 px-4 text-center">
                {formatMoney(invoice.subscriptionPlan?.price)}
              </td>
              <td className="py-3 px-4 text-center">
                {invoice.subscriptionPlan?.discount
                  ? `${invoice.subscriptionPlan.discount}%`
                  : "0%"}
              </td>
              <td className="py-3 px-4 text-center font-semibold text-gray-900">
                {formatMoney(invoice.finalCost)}
              </td>
              <td className="py-3 px-4 text-center">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    invoice.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                      : invoice.status === "PAID"
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-red-100 text-red-700 border border-red-200"
                  }`}
                >
                  {invoice.status}
                </span>
              </td>
              <td className="py-3 px-4 text-center">
                {formatDate(invoice.paymentDate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
