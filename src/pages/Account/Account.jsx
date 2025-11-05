import React, { useEffect, useState } from "react";
import { User, Mail, AtSign, Edit2, CreditCard, Link, CalendarCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

import useUser from "../../hooks/useUser";
import usePayment from "../../hooks/usePayment";

const Account = () => {
  const { getUser, loading, error, updateUser } = useUser();
  const { getPaymentHistory } = usePayment();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [filterType, setFilterType] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("DESC");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfor = await getUser();
        setUser(userInfor);

        const paymentHistory = await getPaymentHistory();
        if (paymentHistory && Array.isArray(paymentHistory)) {
          setTransactions(paymentHistory);
        } else if (paymentHistory) {
          setTransactions(paymentHistory.data || paymentHistory.items || []);
        } else {
          setTransactions([]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setTransactions([]);
      }
    };
    fetchData();
  }, []);

  const formatDate = (isoDate) =>
    new Date(isoDate).toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

  // const handleUpdateUser = async () => {
  //   try {
  //     const updatedUser = await updateUser({ name: user.name, password: user.password });
  //     setUser(updatedUser);
  //     setIsEditing(false);
  //   } catch (err) {
  //     console.error("Error updating user:", err);     
  //   }
  // };

  const formatMoney = (amount) =>
    amount.toLocaleString("vi-VN") + " đ";

  const filteredTransactions = transactions
    .filter((t) => t.status === "SUCCESS")
    .filter((t) => (filterType === "ALL" ? true : t.type === filterType))
    .sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === "ASC" ? dateA - dateB : dateB - dateA;
    });

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-600">
        Đang tải thông tin tài khoản...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-red-600">
        Lỗi: {error}
      </div>
    );
  if (!user)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-600">
        Không tìm thấy thông tin tài khoản.
      </div>
    );

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-7xl mx-auto mb-3">
        {/* Header */}
      <div className="top flex justify-between max-w-7xl mx-auto mb-3">
        <h1 className="title !text-[#14AE5C] !text-4xl !font-bold !mb-5">
          Tài khoản của bạn
        </h1>

        {/* <button
          onClick={() => navigate("/chargingSession")}
          className="!bg-[#009951] !text-white border border-[1] !border-black px-4 py-2 rounded-lg hover:!bg-[#00b35c] transition"
        >
          Đặt chỗ
        </button> */}

        {/* <div className="button">
          <Link
            to="/chargingSession"
            className="!bg-[#009951] !text-white border border-[1] !border-black px-4 py-2 rounded-lg hover:!bg-[#00b35c] transition"
          >
            Đặt chỗ của bạn
          </Link>
      </div>  */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div className="bg-gradient-to-r from-[#00B35C] to-[#008236] px-6 py-8 text-white text-center rounded-t-2xl">
              <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg mb-4">
                <User size={48} className="text-[#008236]" />
              </div>
              <h2 className="text-2xl font-bold">{user.name || "User"}</h2>
              <p className="text-green-100 text-sm mt-1">@{user.username}</p>
            </div>

            {/* Profile Details */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-gray-900">
                  Thông tin cá nhân
                </h3>
                <button
                  onClick={() => navigate("/chargingSession")}
                  className="text-[white] bg-[#00B35C] hover:bg-[#00b35c] transition"
                >
                  <CalendarCheck size={18} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <User size={16} className="mr-1 mb-1 text-gray-500 inline-flex" />
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    value={user.name || ""}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 rounded-lg outline-none transition ${
                      isEditing
                        ? "border border-[#00B35C] focus:ring-2 focus:ring-[#00B35C]"
                        : "border border-gray-200 bg-gray-50"
                    }`}
                    onChange={(e) =>
                      setUser({ ...user, name: e.target.value })
                    }
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Mail size={16} className="mr-1 mb-1 text-gray-500 inline-flex" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email || ""}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 rounded-lg outline-none transition ${
                      isEditing
                        ? "border border-[#00B35C] focus:ring-2 focus:ring-[#00B35C]"
                        : "border border-gray-200 bg-gray-50"
                    }`}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </div>

                {/* Username */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <AtSign size={16} className="mr-1 mb-1 text-gray-500 inline-flex" />
                    Username
                  </label>
                  <input
                    type="text"
                    value={user.username || ""}
                    disabled
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 outline-none cursor-not-allowed"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-[#00B35C] text-white py-2 rounded-lg hover:bg-[#008236] transition font-medium"
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

          {/* Transaction History */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <CreditCard size={24} className="text-[#008236] mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Lịch sử giao dịch
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00B35C] focus:outline-none"
              >
                <option value="ALL">Tất cả</option>
                <option value="VEHICLE SUBSCRIPTION">Đăng ký xe</option>
                <option value="BOOKING">Đặt chỗ</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00B35C] focus:outline-none"
              >
                <option value="DESC">Mới nhất trước</option>
                <option value="ASC">Cũ nhất trước</option>
              </select>
              </div>
              
            </div>

            {filteredTransactions.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <CreditCard size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Không có giao dịch nào</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-gray-100">
                <table className="w-full text-sm text-gray-700">
                  <thead className="bg-[#00B35C] text-white">
                    <tr>
                      <th className="py-3 px-4 text-left">Ngày</th>
                      <th className="py-3 px-4 text-left">Loại</th>
                      <th className="py-3 px-4 text-left">Phương thức</th>
                      <th className="py-3 px-4 text-right">Số tiền</th>
                      <th className="py-3 px-4 text-center">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-100 hover:bg-gray-50 transition"
                      >
                        <td className="py-3 px-4">{formatDate(transaction.createdAt)}</td>
                        <td className="py-3 px-4 font-medium">
                          {transaction.type === "VEHICLE SUBSCRIPTION"
                            ? "Đăng ký xe"
                            : transaction.type === "BOOKING"
                            ? "Đặt chỗ"
                            : "Khác"}
                        </td>
                        <td className="py-3 px-4">{transaction.paymentMethod}</td>
                        <td className="py-3 px-4 text-right font-semibold text-gray-900">
                          {formatMoney(transaction.amount)}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${
                              transaction.status === "SUCCESS"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
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
  );
};

export default Account;
