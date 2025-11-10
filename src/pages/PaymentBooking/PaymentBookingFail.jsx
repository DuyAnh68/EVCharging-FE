import React from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const Fail = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <X className="w-8 h-8 text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Thanh toán thất bại!
        </h1>

        <p className="text-gray-600 mb-6">
          Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại hoặc liên
          hệ hỗ trợ.
        </p>

        <button
          onClick={() => navigate("/booking")}
          className="w-full bg-[#009951] text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors"
        >
          Quay lại đặt chỗ
        </button>
      </div>
    </div>
  );
};

export default Fail;
