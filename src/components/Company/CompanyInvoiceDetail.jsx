const CompanyInvoiceDetail = ({ invoiceDetail }) => {
  if (!invoiceDetail) return (
    <div className="flex justify-center items-center py-10">
      <p className="text-gray-500">Đang tải...</p>
    </div>
  );

  const drivers = invoiceDetail[0]?.driverDetails || {};
  const detail = invoiceDetail[0];
  
  const formatPeriodMonth = (period) => {
    if (!period) return "";
    const d = new Date(period);
    return `${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  const formatMoney = (money) => {
    if (!money) return "0";
    return new Intl.NumberFormat("vi-VN").format(money);
  };

  const driverEntries = Object.entries(drivers);
  const totalInvoices = driverEntries.reduce((sum, [, info]) => sum + (info.invoiceCount || 0), 0);
  const totalAmount = driverEntries.reduce((sum, [, info]) => sum + (info.totalCost || 0), 0);

  return (
    <div>
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 hover:shadow-md transition-shadow">
          <p className="text-blue-600 text-sm font-medium">Tổng tài xế</p>
          <p className="text-2xl font-bold text-blue-900 mt-1">{driverEntries.length}</p>
        </div>
        <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 hover:shadow-md transition-shadow">
          <p className="text-purple-600 text-sm font-medium">Tổng hóa đơn</p>
          <p className="text-2xl font-bold text-purple-900 mt-1">{totalInvoices}</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-lg p-4 hover:shadow-md transition-shadow">
          <p className="text-green-600 text-sm font-medium">Tổng chi phí</p>
          <p className="text-2xl font-bold text-green-900 mt-1">{formatMoney(totalAmount)} đ</p>
        </div>
      </div>

      {/* Period Info */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-gray-200 rounded-lg px-4 py-3 mb-6">
        <p className="text-gray-700 text-sm">
          <span className="font-medium">Kỳ thanh toán:</span>{" "}
          <strong className="text-[#00B35C]">{formatPeriodMonth(detail.period)}</strong>
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-[#00B35C] text-white">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">STT</th>
              <th className="px-6 py-3 text-left font-semibold">Tên tài xế</th>
              <th className="px-6 py-3 text-center font-semibold">ID</th>
              <th className="px-6 py-3 text-center font-semibold">Số hóa đơn</th>
              <th className="px-6 py-3 text-right font-semibold">Tổng chi phí</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {driverEntries.length > 0 ? (
              driverEntries.map(([name, info], index) => (
                <tr key={name} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 text-gray-600">{index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#00B35C] text-white flex items-center justify-center font-semibold text-xs">
                        {name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-gray-900">{name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-600 font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                      {info.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 rounded-full font-semibold text-xs">
                      {info.invoiceCount || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-semibold text-gray-900">
                      {formatMoney(info.totalCost)} đ
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                  Không có dữ liệu tài xế
                </td>
              </tr>
            )}
          </tbody>
          {driverEntries.length > 0 && (
            <tfoot className="bg-gray-50 border-t-2 border-gray-200">
              <tr>
                <td colSpan="3" className="px-6 py-4 text-right font-bold text-gray-900">
                  Tổng cộng:
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full font-bold">
                    {totalInvoices}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="font-bold text-lg text-[#00B35C]">
                    {formatMoney(totalAmount)} đ
                  </span>
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};

export default CompanyInvoiceDetail;
