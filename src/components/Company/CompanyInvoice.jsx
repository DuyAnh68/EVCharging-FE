import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import usePaymentInvoice from "../../hooks/usePaymentInvoice";
import { Loader2 } from "lucide-react";
import usePayment from "../../hooks/usePayment";
import useCompany from "../../hooks/useCompany";

const CompanyInvoice = () => {
  const { id } = useParams();
//   console.log("object", id);
  const { loading, error, doPaymentInvoice } = usePaymentInvoice();
  const [invoice, setInvoice] = useState(null);
  const { getCompanyInvoice } = useCompany();
  const { createPayment } = usePayment();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const inv = await getCompanyInvoice(id);
        // console.log("id", id);
        console.log("Invoice:", inv);
        setInvoice(inv[0]);
      } catch (err) {
        console.error("Error fetching invoice:", err);
      }
    };
    fetchInvoice();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-[#0ea5a4]">
        <Loader2 className="animate-spin mr-2" size={24} />
        Đang tải dữ liệu hóa đơn...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
         Lỗi: {error.message || error.error || "Đã xảy ra lỗi không xác định."}
         console.log("Error object:", error);
      </div>
    );

  if (!invoice)
    return (
      <div className="text-center mt-10 text-gray-600">
        Không có dữ liệu hóa đơn.
      </div>
    );

  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleString("vi-VN", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "—";

  const formatCurrency = (num) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(num ?? 0);

  const status = invoice.status || "UNPAID";
  const isPaid = status === "PAID";

  const handlePayment = async () => {
    try {
      const payment = await doPaymentInvoice(invoice.id);
      console.log("payment", payment);
      console.log("invID", invoice.id);
      if (payment && payment.id) {
        const response = await createPayment(payment.id);
        console.log("response", response.paymentUrl);

        if (response?.paymentUrl) {
          window.open(response.paymentUrl, "_blank");
        } else {
          alert("Không nhận được đường dẫn thanh toán hợp lệ!");
        }
      } else {
        alert("Không thể tạo yêu cầu thanh toán. Vui lòng thử lại.");
      }
    } catch (err) {
      console.error("Error during payment:", err);
      alert("Đã xảy ra lỗi khi thực hiện thanh toán.");
    }
  };

  return (
    <div className="min-h-screen !bg-[#E9F7EA] py-10 px-4 flex justify-center">
      <div className=" w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        {/* Header */}
        <header className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div className="flex gap-3 items-center">
            <div className="w-14 h-14 rounded-lg bg-[#00B35C] flex items-center justify-center text-white font-bold text-lg">
              EV
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                HÓA ĐƠN DỊCH VỤ
              </h1>
              {/* <p className="text-gray-500 text-sm">
                Công ty: Nhà cung cấp điện - Mẫu hóa đơn
              </p> */}
            </div>
          </div>

          <div className="text-right">
            <div
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-full font-semibold border text-sm ${
                isPaid
                  ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                  : "bg-red-50 text-red-600 border-red-100"
              }`}
            >
              {isPaid ? "PAID" : "UNPAID"}
            </div>
            <div className="text-gray-500 text-xs mt-1">
              Paid at: {formatDate(invoice.paidAt)}
            </div>
          </div>
        </header>

        {/* Body grid */}
        <div className="grid md:grid-cols-[1fr_320px] gap-6">
          {/* Left section */}
          <div>
            <h3 className="font-semibold mb-2">Thông tin hóa đơn</h3>
            <p className="text-sm text-gray-500">
              Mã hóa đơn: <strong>#{invoice.id}</strong>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Kỳ (period): {formatDate(invoice.period)}
            </p>

            <table className="w-full mt-4 border-collapse">
              <thead>
                <tr className="text-gray-500 text-xs border-b">
                  <th className="text-left py-2 px-3">Mục</th>
                  <th className="text-right py-2 px-3">Giá trị</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-3">Tổng năng lượng (kWh)</td>
                  <td className="text-right py-2 px-3">
                    {invoice.totalEnergy ?? 0}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Tổng chi phí (VND)</td>
                  <td className="text-right py-2 px-3">
                    {formatCurrency(invoice.totalCost)}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Số tiền đã trả (VND)</td>
                  <td className="text-right py-2 px-3">
                    {formatCurrency(invoice.paidCost)}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mt-4 border-t pt-3">
              <div className="flex justify-between font-semibold text-gray-700">
                <span>Số phải trả</span>
                <span className="text-lg">
                  {formatCurrency(
                    Math.max(0, invoice.totalCost - invoice.paidCost)
                  )}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {isPaid
                  ? "Trạng thái: Đã thanh toán. Cảm ơn bạn đã sử dụng dịch vụ."
                  : "Trạng thái: Chưa thanh toán — vui lòng thanh toán để tránh bị gián đoạn dịch vụ."}
              </p>
            </div>
          </div>

          {/* Right summary */}
          <aside className="bg-gray-50 p-4 rounded-xl">
            <p className="text-xs text-gray-500">Tóm tắt</p>
            <p className="text-xl font-bold mt-2">
              {formatCurrency(invoice.totalCost)}
            </p>

            <div className="mt-3 text-sm text-gray-500">
              <p>
                Ngày tạo (UTC):
                <br />
                <span className="text-gray-700">
                  {new Date(invoice.period).toISOString().replace("T", " ").replace("Z", " UTC")}
                </span>
              </p>
              <p className="mt-3">
                Ngày (Local):
                <br />
                <span className="text-gray-700">{formatDate(invoice.period)}</span>
              </p>
            </div>

            <p className="mt-4 text-sm text-gray-500">
              Trạng thái hiện tại:
              <br />
              <span
                className={`font-semibold ${
                  isPaid ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {isPaid ? "PAID" : "UNPAID"}
              </span>
            </p>
          </aside>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6 print:hidden">
          <button
            onClick={() => window.print()}
            className="bg-[#0ea5a4] text-white px-4 py-2 rounded-lg hover:bg-[#0c8c8a] transition"
          >
            In / Lưu PDF
          </button>
          <button
            onClick={() => handlePayment()}
            className="bg-[#00B35C] text-white px-4 py-2 rounded-lg hover:bg-[#009B4D] transition"
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyInvoice;
