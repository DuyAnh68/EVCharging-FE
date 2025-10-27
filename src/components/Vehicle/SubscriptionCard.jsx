import React from "react";
import { Check } from "lucide-react";

const SubscriptionCard = ({ data, selectedPlan, onSelect }) => {
  const { id, name, price, limitValue, description } = data;
  const isSelected = String(selectedPlan) === String(id);
  const formattedPrice = price.toLocaleString("vi-VN") + " đ/tháng";

  return (
    <article
      role="button"
      aria-pressed={isSelected}
      onClick={() => onSelect(id)}
      className={`w-full max-w-[320px] flex-shrink-0 cursor-pointer bg-white rounded-xl p-5 border-2 transition-all
        ${isSelected ? "border-[#009951] shadow-lg scale-105" : "border-gray-200 hover:border-[#009951] hover:shadow-sm"}
      `}
    >
      <div className="flex flex-col h-full">
        <header className="mb-2 overflow-hidden">
          <h2 className="text-sm md:text-base font-bold text-center text-gray-900 truncate whitespace-nowrap">
            {name}
          </h2>
        </header>

        <div className="flex flex-col items-center mb-3">
          <p className="text-xl md:text-2xl font-extrabold text-[#009951]">{formattedPrice}</p>
          <p className="text-sm text-gray-600">Giới hạn: {limitValue} kWh</p>
        </div>

        <ul className="flex-1 space-y-2 mb-4 px-2">
          {description?.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-700">
              <Check size={16} className="text-[#009951] flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(id);
            }}
            className={`w-full py-1.5 px-3 rounded-lg font-semibold text-sm transition
              ${isSelected ? "bg-[#009951] text-white" : "bg-gray-100 text-gray-900 hover:bg-[#009951] hover:text-white"}
            `}
          >
            {isSelected ? "Đã chọn" : "Chọn gói này"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default SubscriptionCard;
