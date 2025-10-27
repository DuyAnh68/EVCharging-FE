// ...existing code...
import React from "react";

function VehicleDetail({ vehicle }) {
  if (!vehicle) return <div className="text-center text-gray-500">Không có dữ liệu</div>;

  const subscription = vehicle.vehicleSubscriptionResponse;
  const plan = subscription?.subscriptionPlanResponse;

  return (
    <div className="p-2 md:p-4 w-full">
      <div className="font-bold text-lg md:text-xl text-[#14AE5C] mb-2 truncate">
        {vehicle.model.modelName} — {vehicle.licensePlate}
      </div>

      <div className="text-gray-700 mb-1">
        <span className="font-medium">Hãng:</span> {vehicle.model.brand}
      </div>

      <div className="text-gray-700 mb-1">
        <span className="font-medium">Chuẩn sạc:</span> {vehicle.model.connector}
      </div>

      <div className="text-gray-700 mb-1">
        <span className="font-medium">Dung lượng pin:</span> {vehicle.model.batteryCapacity} kWh
      </div>

      {subscription ? (
        <div className="mt-4 p-3 border rounded bg-[#F8FFF3]">
          <div className="font-semibold text-md md:text-lg text-[#009951] mb-1">
            {plan?.name}
          </div>

          <div className="text-gray-700 mb-1">
            <span className="font-medium">Trạng thái:</span> {subscription.status}
          </div>

          <div className="text-gray-700 mb-1">
            <span className="font-medium">Bắt đầu:</span>{" "}
            {new Date(subscription.startDate).toLocaleDateString("vi-VN")}
          </div>

          <div className="text-gray-700 mb-1">
            <span className="font-medium">Kết thúc:</span>{" "}
            {new Date(subscription.endDate).toLocaleDateString("vi-VN")}
          </div>

          <div className="text-gray-700 mb-1">
            <span className="font-medium">Giá:</span>{" "}
            {plan?.price?.toLocaleString("vi-VN")} đ/tháng
          </div>

          <div className="text-gray-700 mb-1">
            <span className="font-medium">Hạn mức:</span> {plan?.limitValue} kWh/tháng
          </div>

          {plan?.description?.length > 0 && (
            <ul className="list-disc ml-5 mt-2 text-gray-600 space-y-1">
              {plan.description.map((line, index) => (
                <li key={index} className="text-sm">
                  {line}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div className="mt-4 italic text-gray-600">Chưa đăng ký gói năng lượng.</div>
      )}
    </div>
  );
}

export default VehicleDetail;