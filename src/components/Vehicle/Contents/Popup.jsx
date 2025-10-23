import React from "react";

const Popup = ({ message, onClose}) => {
  if (!message) return null;
    
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px] text-center">
        <h2 className="text-xl font-bold text-[#009951] mb-3">Thông báo</h2>
        <p className="text-gray-800 whitespace-pre-line">{message}</p>
        <button
          onClick={onClose}
          className="mt-5 w-full bg-[#009951] text-white py-2 rounded-lg hover:bg-[#007a41] transition"
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default Popup;
