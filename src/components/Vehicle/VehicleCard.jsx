import React, {  useState } from "react";
import { Battery, Plug, X } from "lucide-react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import useVehicle from "../../hooks/useVehicle";
import VehicleDetail from "./VehicleDetail";
import usePayment from "../../hooks/usePayment";
import { useNavigate } from "react-router-dom";
import ModelCar from "../../assets/icons/modelCar";
import ChargeHistory from "./ChargeHistory";


const VehicleCard = ({ data, onDeleted }) => {
  const vehicle = data;
  const { getVehicleById, deleteVehicle } = useVehicle();
  const { createPayment, getPayment } = usePayment();
  const [vehicleDetail, setVehicleDetail] = useState(null);
  const [open, setOpen] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const navigate = useNavigate();
  

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!vehicle?.id) return;
    const ok = window.confirm("Bạn có chắc muốn xóa xe này không?");
    if (!ok) return;

    try {
      const res = await deleteVehicle(vehicle?.id);
      console.log("resdel", res);
      if (res && res.deleteSuccess) {
        if (typeof onDeleted === "function") onDeleted(vehicle.id);
        else navigate("/vehicle");
        navigate("/vehicle");
      } else {
        alert("Xóa thất bại. Vui lòng thử lại.");
      }
    } catch (err) {
      console.error("delete error:", err);
      alert("Đã xảy ra lỗi khi xóa xe.");
    }
  };

  const handlePayment = async (subscriptionId) => {
    try {
      const subId =
        subscriptionId ||
        vehicle?.vehicleSubscriptionResponse?.id ||
        vehicleDetail?.vehicleSubscriptionResponse?.id;
        console.log("reponsesybid", vehicle?.vehicleSubscriptionResponse?.id);
      if (!subId) {
        alert("Không tìm thấy thông tin thanh toán.");
        return;
      }
      const response = await getPayment(subId);
      console.log("ress", response);
      if (response) {
        const paymentid = await createPayment(vehicle?.vehicleSubscriptionResponse?.id);
        console.log("paymentid", paymentid);
        if (paymentid && paymentid.paymentUrl) {
          window.open(paymentid.paymentUrl, "_blank");
        } else {
          alert("Không thể tạo yêu cầu thanh toán. Vui lòng thử lại.");
        }
      } else {
        alert("Không tìm thấy thông tin payment.");
      }
    } catch (e) {
      console.log("Error:", e?.message || e);
      alert("Đã xảy ra lỗi khi tạo thanh toán.");
    }
  };

  const handleChargeHistory = async (e) => {
    e.stopPropagation();
    setOpenHistory(true);
  }


  const handleDetail = async () => {
    try {
      const response = await getVehicleById(vehicle?.id);
      if (response) {
        const detail = response.result ?? response;
        setVehicleDetail(detail);
        setOpen(true);
      }
    } catch (e) {
      console.log("Error:", e.message);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleDetail}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleDetail();
        }
      }}
      className="max-w-sm rounded-2xl overflow-hidden shadow bg-white border border-gray-200 m-4 transition hover:shadow-lg cursor-pointer focus:outline-none"
    >
      <div className="w-full h-46 !bg-gray-100 flex items-center justify-center">
        <img src={vehicle?.model?.url} alt={vehicle?.model?.modelName} className="w-full h-full object-cover" />
      </div>

      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-3 text-black">
          {vehicle?.model?.modelName || "Unknown Model"}
        </h2>

        <div className="text-gray-700 text-base space-y-2">
          <p>
            <span className="font-semibold">Brand:</span>{" "}
            {vehicle?.model?.brandName || "N/A"}
          </p>

          <p>
            <span className="font-semibold">License Plate:</span>{" "}
            {vehicle?.licensePlate || "N/A"}
          </p>

          <div className="flex items-center">
            <Plug size={18} className="mr-2 text-blue-600" />
            <span>{vehicle?.model?.connector || "Unknown"}</span>
          </div>

          <div className="flex items-center">
            <Battery size={18} className="mr-2 text-green-600" />
            <span>{(vehicle?.model?.batteryCapacity || 0).toFixed(2)} kWh</span>
          </div>

          <div className="mt-3">
            <span
              className={`px-3 py-1 text-sm rounded-full ${
                vehicle?.vehicleSubscriptionResponse?.status === "ACTIVE"
                  ? "bg-green-100 text-green-700"
                  : vehicle?.vehicleSubscriptionResponse?.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-700"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (vehicle?.vehicleSubscriptionResponse?.status === "PENDING") {
                  handlePayment(vehicle.vehicleSubscriptionResponse.id);
                }
              }}
            >
              {vehicle?.vehicleSubscriptionResponse?.status || "UNKNOWN"}
            </span>
          </div>
        </div>
      </div>

      
      <div className="px-6 pt-3 pb-4 flex gap-3 bg-gray-50">
        <button
          onClick={handleDelete}
          className="flex-1 bg-red-500 text-[white] rounded-lg px-3 py-1 text-xs md:text-sm hover:bg-red-700 transition"
        >
          Xóa
        </button>

        <button
          // onClick={(e) => {
          //   e.stopPropagation();
          //   // navigate(`/vehicle/${vehicle?.id}/history`);
          // }}
          onClick={handleChargeHistory}
          className="flex-1 bg-[#00B35C] text-[white] rounded-lg px-3 py-1 text-xs md:text-sm hover:bg-green-600 transition"
        >
          Lịch sử sạc
        </button>
      </div>
      <Popup
  open={openHistory}
  onClose={() => setOpenHistory(false)}
  modal
  nested
  closeOnDocumentClick
  lockScroll
  closeOnEscape
  contentStyle={{
    borderRadius: "20px",
    padding: "0",
    width: "95vw",
    maxWidth: "1200px",
    maxHeight: "85vh",
    overflow: "hidden",
    background: "white",
    boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
    animation: "popup-fade-in 0.25s ease-out",
  }}
  overlayStyle={{
    background: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(4px)",
  }}
>
  <div className="flex flex-col h-full max-h-[85vh]">
    {/* Header */}
    <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-50">
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800">Lịch sử sạc xe </h3>
        <h4 className="text-lg font-semibold text-gray-800">{vehicle.licensePlate}</h4>
      </div>
      
      <button
        onClick={() => setOpenHistory(false)}
        className="text-gray-500 hover:text-gray-700 transition"
        aria-label="Đóng"
      >
        <X size={22} />
      </button>
    </div>

    {/* Nội dung */}
    <div className="p-5 overflow-y-auto">
      <ChargeHistory
        vehicleId={vehicle.id}
        onClose={() => setOpenHistory(false)}
      />
    </div>
  </div>
</Popup>
    
      <Popup
        open={open}
        onClose={() => setOpen(false)}
        modal
        nested
        closeOnDocumentClick
        lockScroll
        closeOnEscape
        contentStyle={{ borderRadius: "16px", padding: "0", width: "90vw", maxWidth: "900px", maxHeight: "85vh", overflow: "auto" }}
        overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
      >
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg animate-fadeIn overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800">Thông tin xe</h3>
      <button
        onClick={() => setOpen(false)}
        className="text-gray-500 hover:text-gray-700 transition"
        aria-label="Đóng"
      >
        <X size={22} />
      </button>
    </div>

    <div className="p-6 flex flex-col items-center justify-center">
      <VehicleDetail vehicle={vehicleDetail} onPay={handlePayment} />
    </div>
  </div>
</div>

      </Popup>
    </div>
  );
};

export default VehicleCard;