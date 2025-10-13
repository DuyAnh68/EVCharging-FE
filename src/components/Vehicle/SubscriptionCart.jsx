import React, { useState } from "react";
import { Check } from "lucide-react";

function SubscriptionCard() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 1,
      name: "Gói cơ bản",
      price: "600.000 đ/tháng",
      features: [
        "Sạc tại tất cả các trạm",
        "Giá sạc tiêu chuẩn",
        "120kWh miễn phí",
        "Theo dõi lịch sử sạc",
      ],
    },
    {
      id: 2,
      name: "Gói nâng cao",
      price: "900.000 đ/tháng",
      features: [
        "Ưu tiên tại trạm sạc",
        "Giảm 10% giá sạc",
        "200kWh miễn phí",
        "Theo dõi qua ứng dụng",
      ],
    },
  ];

  return (
    <div className="flex flex-1 h-full pb-25 justify-center gap-10 mt-10">
      {plans.map((plan) => (
        <div
          key={plan.id}
          onClick={() => setSelectedPlan(plan.id)}
          className={`w-[300px] cursor-pointer bg-white rounded-xl p-6 border-2 transition-all 
            ${
              selectedPlan === plan.id
                ? "border-[#009951] shadow-lg scale-105"
                : "border-gray-300 hover:border-[#009951]"
            }`}
        >
          <h2 className="text-xl text-[black] font-bold text-center mb-1">{plan.name}</h2>
          <p className="text-center text-2xl font-bold text-[#009951] mb-4">
            {plan.price}
          </p>

          <ul className="space-y-2 mb-6">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-700">
                <Check className="text-[#009951]" size={18} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <button
            className={`w-full py-2 rounded-lg font-semibold transition 
              ${
                selectedPlan === plan.id
                  ? "!bg-[#009951] text-white"
                  : "!bg-gray-200 text-black hover:bg-[#009951] hover:text-white"
              }`}
          >
            {selectedPlan === plan.id ? "Đã chọn" : "Chọn gói này"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default SubscriptionCard;
