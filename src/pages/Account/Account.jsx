import React, { useEffect, useState } from "react";
import { User, Mail, AtSign, Edit2, CreditCard } from "lucide-react";
import useUser from "../../hooks/useUser";
import usePayment from "../../hooks/usePayment";

const Account = () => {
  const { getUser, loading, error } = useUser();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { getPaymentHistory } = usePayment();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfor = await getUser();
        console.log("user:", userInfor);
        setUser(userInfor);

        const paymentHistory = await getPaymentHistory();
        console.log("paymentHistory:", paymentHistory);
        
        // Check if paymentHistory is valid and is an array
        if (paymentHistory && Array.isArray(paymentHistory)) {
          setTransactions(paymentHistory);
        } else if (paymentHistory) {
          // If it's an object with a data or items property
          setTransactions(paymentHistory.data || paymentHistory.items || []);
        } else {
          console.warn("Payment history is empty or invalid");
          setTransactions([]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setTransactions([]);
      }
    };
    fetchData();
  }, []);

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatMoney = (amount) => {
    return amount.toLocaleString("vi-VN") + " đ";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Đang tải thông tin tài khoản...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">Lỗi: {error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Không tìm thấy thông tin tài khoản.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tài khoản của bạn</h1>
          <p className="mt-2 text-gray-600">
            Quản lý thông tin cá nhân và xem lịch sử giao dịch
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-[#00B35C] to-[#008236] px-6 py-8 text-white">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <User size={48} className="text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold">{user.name || "User"}</h2>
                  <p className="text-blue-100 text-sm mt-1">@{user.username}</p>
                </div>
              </div>

              {/* Profile Details */}
              <div className="px-6 py-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Thông tin cá nhân
                  </h3>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-blue-600 hover:text-blue-700 transition"
                    aria-label="Chỉnh sửa"
                  >
                    <Edit2 size={18} />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <label className="flex flex-col gap-2 text-sm font-medium text-gray-700 mb-2">
                      <User size={16} className="mr-2 text-gray-500" />
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      value={user.name || ""}
                      disabled={!isEditing}
                      className={`w-full px-4 py-2 border rounded-lg transition ${
                        isEditing
                          ? "border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          : "border-gray-200 bg-gray-50"
                      } outline-none`}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Mail size={16} className="mr-2 text-gray-500" />
                      Email
                    </label>
                    <input
                      type="email"
                      value={user.email || ""}
                      disabled={!isEditing}
                      className={`w-full px-4 py-2 border rounded-lg transition ${
                        isEditing
                          ? "border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          : "border-gray-200 bg-gray-50"
                      } outline-none`}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                  </div>

                  {/* Username Field */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <AtSign size={16} className="mr-2 text-gray-500" />
                      Username
                    </label>
                    <input
                      type="text"
                      value={user.username || ""}
                      disabled
                      className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-lg outline-none cursor-not-allowed"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => {
                        // TODO: Call API to save changes
                        setIsEditing(false);
                      }}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                      Lưu thay đổi
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
                    >
                      Hủy
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <CreditCard size={24} className="text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Lịch sử giao dịch
                  </h3>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Xem tất cả
                </button>
              </div>

              {transactions.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <CreditCard size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>Chưa có giao dịch nào</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                          Ngày
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                          Loại
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                          Mô tả
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                          Số tiền
                        </th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                          Trạng thái
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction) => (
                        <tr
                          key={transaction.id}
                          className="border-b border-gray-100 hover:bg-gray-50 transition"
                        >
                          <td className="py-4 px-4 text-sm text-gray-600">
                            {formatDate(transaction.date)}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-900 font-medium">
                            {transaction.type}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600">
                            {transaction.description}
                          </td>
                          <td className="py-4 px-4 text-sm text-right font-semibold text-gray-900">
                            {formatMoney(transaction.amount)}
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                              {transaction.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
