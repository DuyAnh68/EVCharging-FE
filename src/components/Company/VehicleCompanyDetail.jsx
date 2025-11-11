import React from "react";

function VehicleCompanyDetail({ vehicle, onPay }) {
  if (!vehicle) return <div className="text-center text-gray-500">Không có dữ liệu</div>;

  const subscription = vehicle.vehicleSubscriptionResponse;
  const plan = subscription?.subscriptionPlanResponse;
  const status = subscription?.status;

  return (
    <div className="p-2 md:p-4 w-full text-center">
      <div className="font-bold text-lg md:text-xl text-[#14AE5C] mb-2">
        {vehicle.model?.modelName} — {vehicle.licensePlate}
      </div>

      <div className="text-gray-700 mb-1">
        <span className="font-medium">Hãng:</span> {vehicle.model?.brandName}
      </div>

      <div className="text-gray-700 mb-1">
        <span className="font-medium">Chuẩn sạc:</span> {vehicle.model?.connector}
      </div>

      <div className="text-gray-700 mb-1">
        <span className="font-medium">Dung lượng pin:</span> {vehicle.model?.batteryCapacity} kWh
      </div>

      {subscription ? (
        <div className="mt-4 p-3 border rounded bg-[#F8FFF3] inline-block text-left">
          <div className="font-semibold text-md md:text-lg text-[#009951] mb-1">
            {plan?.name}
          </div>

          <div className="text-gray-700 mb-1">
            <span className="font-medium">Trạng thái:</span>{" "}
            <span className="font-semibold">{status}</span>
          </div>

          <div className="text-gray-700 mb-1">
            <span className="font-medium">Bắt đầu:</span>{" "}
            {subscription.startDate ? new Date(subscription.startDate).toLocaleDateString("vi-VN") : "-"}
          </div>

          <div className="text-gray-700 mb-1">
            <span className="font-medium">Kết thúc:</span>{" "}
            {subscription.endDate ? new Date(subscription.endDate).toLocaleDateString("vi-VN") : "-"}
          </div>

          <div className="text-gray-700 mb-1">
            <span className="font-medium">Giá:</span>{" "}
            {plan?.price ? plan.price.toLocaleString("vi-VN") + " đ/tháng" : "-"}
          </div>

          <div className="text-gray-700 mb-1">
            <span className="font-medium">Giảm giá:</span> {plan?.discount ?? "-"} %
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

          {status === "PENDING" && (
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => onPay?.(subscription.id)}
                className="flex-1 bg-[#009951] text-white rounded-md px-4 py-2 text-sm hover:bg-green-600 transition"
              >
                Thanh toán
              </button>
              {/* <button
                onClick={() => {}}
                className="flex-1 bg-gray-100 text-gray-800 rounded-md px-4 py-2 text-sm hover:bg-gray-200 transition"
              >
                Sau
              </button> */}
            </div>
          )}
        </div>
      ) : (
        <div className="mt-4 italic text-gray-600">Chưa đăng ký gói năng lượng.</div>
      )}
    </div>
  );
}

export default VehicleCompanyDetail;