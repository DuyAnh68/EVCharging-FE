import React from "react";
import { CheckCircle2 } from "lucide-react";
import Logo from "../../assets/Images/Logo.png";

const VerifySuccess = () => {
  return (
    <div className="min-h-screen bg-[#f7fbea] flex flex-col items-center justify-center px-4">
      {/* Main Card */}
      <div className="bg-white shadow-md rounded-2xl p-10 w-full max-w-md text-center">
        <CheckCircle2 className="mx-auto !text-green-500 w-16 h-16 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Xác thực Email thành công
        </h2>
        <p className="text-gray-600 mb-6">
          Email của bạn đã được xác thực thành công. Bây giờ bạn có thể đăng
          nhập và bắt đầu khám phá các trạm sạc gần bạn.
        </p>

        <a
          href="/login"
          className="inline-block bg-green-500 hover:bg-green-600 !text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 shadow-sm"
        >
          Đi đến trang đăng nhập
        </a>
      </div>
    </div>
  );
};

export default VerifySuccess;
