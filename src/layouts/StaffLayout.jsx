import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer.jsx";
import { UserCircle, Zap, ChevronDown, Bell, Settings } from "lucide-react";
import Logo from "../assets/Images/logo.png";
import { useState } from "react";
import useAuth from "../hooks/useAuth.js";

const StaffLayout = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-white">
      {/* Enhanced Header with glassmorphism */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-lg border-b border-emerald-100/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo Section with Animation */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                <img
                  className="h-12 w-auto relative z-10 transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300"
                  src={Logo}
                  alt="EV Charge"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-900 font-black text-2xl tracking-tight">
                  EV
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
                    Charge
                  </span>
                </span>
                <Zap className="text-yellow-500 fill-yellow-500 w-5 h-5 animate-pulse" />
              </div>
            </div>

            {/* Center Title with Badge Effect */}
            <div className="flex items-center gap-3"></div>

            {/* Right Section: Notifications & User Profile */}
            <div className="flex items-center gap-4">
              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <span className="text-gray-700 font-semibold text-sm hidden sm:block">
                    {user?.name || "Staff Member"}
                  </span>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur opacity-40"></div>
                    <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
                      <UserCircle
                        size={24}
                        className="text-white"
                        strokeWidth={2.5}
                      />
                    </div>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform duration-300 ${
                      showUserMenu ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-4">
                      <p className="text-xs text-green-100 font-medium">
                        Đã đăng nhập với
                      </p>
                      <p className="text-sm font-bold text-white truncate mt-1">
                        {user?.name || "Staff Member"} (nhân viên)
                      </p>
                      <p className="text-xs text-green-100 truncate">
                        {user?.email || "staff@evcharge.com"}
                      </p>
                    </div>
                    <div className="py-2">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Enhanced Design */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto relative">
          {/* Decorative Background Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-200/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl -z-10"></div>

          {/* Content Card with Glow Effect */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100/50 p-8 transition-all duration-500 hover:shadow-3xl">
              {/* Optional: Status Bar */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-600">
                    Đang hoạt động
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date().toLocaleDateString("vi-VN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              <Outlet />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default StaffLayout;
