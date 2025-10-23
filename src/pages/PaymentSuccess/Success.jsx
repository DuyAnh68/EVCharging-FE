import React from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <Check className="w-8 h-8 text-green-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Thanh toán thành công!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Cảm ơn bạn đã thanh toán. Gói thuê bao của bạn đã được kích hoạt.
        </p>

        <button
          onClick={() => navigate("/vehicles")}
          className="w-full bg-[#009951] text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors"
        >
          Quay lại danh sách xe
        </button>
      </div>
    </div>
  );
};

export default Success;