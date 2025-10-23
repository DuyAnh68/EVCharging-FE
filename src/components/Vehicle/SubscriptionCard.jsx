import React from "react";
import { Check } from "lucide-react";

const SubscriptionCard = ({ data, selectedPlan, onSelect }) => {
  const { id, name, price, limitValue, description } = data;
  const isSelected = String(selectedPlan) === String(id);
  const formattedPrice = price.toLocaleString("vi-VN") + " đ/tháng";

  return (
    <div
      onClick={() => onSelect(id)}
      className={`w-[300px] cursor-pointer bg-white rounded-xl p-6 border-2 transition-all m-4 
        ${isSelected ? "border-[#009951] shadow-lg scale-105" : "border-gray-300 hover:border-[#009951]"}
      `}
    >
      <h2 className="text-xl font-bold text-center mb-1">{name}</h2>

      <p className="text-center text-2xl font-bold text-[#009951] mb-2">
        {formattedPrice}
      </p>

      <p className="text-center text-gray-600 mb-4">
        Giới hạn: {limitValue} kWh
      </p>

      <ul className="space-y-2 mb-6">
        {description?.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-700">
            <Check className="text-[#009951]" size={18} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={(e) => {
          e.stopPropagation(); 
          onSelect(id);
        }}
        className={`w-full py-2 rounded-lg font-semibold transition 
          ${isSelected ? "!bg-[#009951] text-white" : "!bg-gray-200 text-black hover:bg-[#009951] hover:text-white"}
        `}
      >
        {isSelected ? "Đã chọn" : "Chọn gói này"}
      </button>
    </div>
  );
};

export default SubscriptionCard;
