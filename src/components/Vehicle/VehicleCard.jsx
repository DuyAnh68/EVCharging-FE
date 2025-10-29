  import React, { useState } from "react";
  import { Battery, Plug, Car } from "lucide-react";
  import Popup from 'reactjs-popup';
  import 'reactjs-popup/dist/index.css';
  import useVehicle from "../../hooks/useVehicle";
  import VehicleDetail from "./VehicleDetail";
  import usePayment from "../../hooks/usePayment";

  const VehicleCard = ({ data }) => {
    const vehicle = data;
    const { getVehicleById } = useVehicle();
    const {createPayment, getPayment} = usePayment();
    const [vehicleDetail, setVehicleDetail] = useState(null);
    const [open, setOpen] = useState(false);
    
    const handlePayment = async() =>{
      try{
        console.log("id:", vehicle?.vehicleSubscriptionResponse?.id);
        const response = await getPayment(vehicle?.vehicleSubscriptionResponse?.id)
        console.log("url:", response);
        if(response){
          const paymentid = await createPayment(response.id)

          if(paymentid){
            window.open(paymentid.paymentUrl, "_blank");
          }        
        }
      }catch(e){
        console.log("Error:", e.message);
      }
    };



    const handleDetail = async () => {
      try{
        const response = await getVehicleById(vehicle?.id);
        console.log("as:",response);
        if(response){
          setVehicleDetail(response);
          setOpen(true); 
        }
      }catch(e){
        console.log("Error:", e.message);
      }
    }

    return (
      <div className="max-w-sm rounded-2xl overflow-hidden shadow bg-white border border-gray-200 m-4 transition hover:shadow-lg">
        {/* Ảnh hoặc icon xe */}
        <div className="w-full h-40 !bg-gray-100 flex items-center justify-center">
          <Car size={48} className="text-gray-400" />
        </div>

        {/* Nội dung */}
        <div className="px-6 py-4">
          <h2 className="font-bold text-xl mb-3 text-black">
            {vehicle?.model?.modelName || "Unknown Model"}
          </h2>

          <div className="text-gray-700 text-base space-y-2">
            <p>
              <span className="font-semibold">Brand:</span>{" "}
              {vehicle?.model?.brand || "N/A"}
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

            {/* Trạng thái */}
            <div className="mt-3">
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  vehicle?.vehicleSubscriptionResponse?.status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : vehicle?.vehicleSubscriptionResponse?.status === "PENDING"
                    ? "bg-red-100 text-red-700"
                    : "bg-red-100 text-red-700"
                }`}
                onClick={vehicle?.vehicleSubscriptionResponse?.status === "PENDING" ? () => handlePayment() : undefined}
              >
                {vehicle?.vehicleSubscriptionResponse?.status || "UNKNOWN"}
              </span>
            </div>
          </div>
        </div>

        {/* Nút hành động */}
        <div className="px-6 pt-3 pb-4 flex justify-between bg-gray-50">
          <button 
            onClick={handleDetail}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
            Chi tiết
          </button>
          <button className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-blue-700 transition">
            Sạc ngay
          </button>
        </div>
        
        <Popup open={open} onClose={() => setOpen(false)} modal nested closeOnDocumentClick>
          <div className="max-w-md w-full rounded-lg overflow-hidden">
            
            <div className="p-4">
              <VehicleDetail vehicle={vehicleDetail} />
            </div>

            <div className="flex justify-end p-3">
              <button
                className="bg-green-100 text-green-700 hover:text-gray-800"
                onClick={() => setOpen(false)}
                aria-label="Đóng"
              >
                Đóng
              </button>
            </div>
          </div>
        </Popup>

      </div>
    );
  };

  export default VehicleCard;
