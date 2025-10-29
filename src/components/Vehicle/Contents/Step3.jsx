import React, { useContext, useEffect, useState } from "react";
import { CreditCard } from "lucide-react";
import SubscriptionCard from "../SubscriptionCard";
import StepperContext from "../../../contexts/Vehicle/StepperProvider";
import useSubscription from "../../../hooks/useSubscription";
import useVehicle from "../../../hooks/useVehicle";
import Popup from "./Popup";
import usePayment from "../../../hooks/usePayment";
// import { useNavigate } from "react-router-dom";

function Step3() {
  const { currentStep, setCurrentStep, vehicleData, setVehicleData } =
    useContext(StepperContext);
  const { getSubscriptions, subscriptions, loading, error } = useSubscription();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { addVehicle } = useVehicle();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const { createPayment, getPayment } = usePayment();
  const [paymentId, setPaymentId] = useState(null);
  const [subscriptionId, setSubscriptionId] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    getSubscriptions();
  }, []);

  const handelSelectPlan = (planId) => {
    setSelectedPlan(planId);
    setVehicleData((prev) => ({ ...prev, subscriptionId: planId }));
  };

  const handleNext = async () => {
    if (!selectedPlan) {
      alert("Vui lòng chọn gói thuê bao trước khi tiếp tục!");
      return;
    }

    try {
      const response = await addVehicle({
        modelId: vehicleData.modelId,
        licensePlate: vehicleData.licensePlate,
        subscriptionPlanId: selectedPlan,
      });
      if (response) {
        const subID = response.vehicleSubscriptionResponse.id;
        setSubscriptionId(subID);

        const paymentid = await getPayment(subID);
        console.log("getPayment return:", paymentid);
        if(paymentid){                   
          setPaymentId(paymentid.id)
          console.log("paymentid", paymentid.id);
        }
        
        setPopupMessage(`Xe đã được thêm thành công!`);
        setShowPopup(true);
      } else {
        setPopupMessage("Không thể thêm xe. Vui lòng thử lại!");
        setShowPopup(true);
      }
    } catch (e) {
      setPopupMessage("Đã xảy ra lỗi trong quá trình thêm xe!", e.message);
      setShowPopup(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePayment = async () => {
    try {
      const response = await createPayment(paymentId);
      if (response) {
        window.open(response.paymentUrl, "_blank");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleCloseWithoutPayment = () => {
    const msg =
      "Xe của bạn đã được thêm nhưng chưa thanh toán gói thuê bao, hãy thanh toán để sử dụng xe";
    setVehicleData((prev) => ({
      ...prev,
      unpaidMessage:
        msg,
    }));
    setShowPopup(false);
    setCurrentStep(3);
  };

  return (
    <div>
      <div className="bg-[#D9D9D9] p-6 md:p-8 shadow-sm flex flex-col gap-6 rounded-[24px]">
        <div className="flex items-center gap-3">
          <div className="w-[36px] h-[36px] bg-[#009951] flex items-center justify-center rounded-full">
            <CreditCard className="text-[black]" />
          </div>
          <div className="title text-[black] font-bold text-xl md:text-2xl">
            Gói thuê bao
          </div>
        </div>

        <p className="text-[black] max-w-2xl">
          Chọn gói phù hợp với nhu cầu sạc xe của bạn
        </p>

        <div className="w-full">
          {loading ? (
            <p>Đang tải gói thuê bao...</p>
          ) : error ? (
            <p className="text-red-600">Lỗi: {error}</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-4">
              {subscriptions?.map((s) => (
                <SubscriptionCard
                  key={s.id}
                  data={s}
                  selectedPlan={selectedPlan}
                  onSelect={() => handelSelectPlan(s.id)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center gap-4">
          <button
            onClick={handleBack}
            className="bg-[#3C3C43] text-white font-medium py-2 px-4 text-sm rounded-md hover:bg-[#343436] transition"
          >
            Quay lại
          </button>

          <div className="flex-1" />

          <button
            onClick={handleNext}
            className="bg-[#009951] text-white font-medium py-2 px-4 text-sm rounded-md hover:bg-green-600 transition"
          >
            Tiếp tục
          </button>
        </div>

        {showPopup && <Popup message={popupMessage} onClose={handlePayment} onCloseAlt={handleCloseWithoutPayment}/>}
      </div>

      <div className="flex flex-col bg-white mt-5 shadow-sm rounded-md">
        <div className="flex items-start gap-3 pl-3 pt-3">
          <div className="w-[28px] h-[28px] bg-[#009951] flex items-center justify-center rounded-full">
            <CreditCard className="text-[black]" />
          </div>
          <div className="text-[black] font-medium text-lg">Thông tin thanh toán</div>
        </div>
        <div className="pl-12 pt-2 pb-5 text-[black]">
          Bạn có thể đổi hoặc hủy gói bất kỳ lúc nào. Phí sạc thực tế sẽ được
          tính dựa trên mức giá ưu đãi của gói đã chọn
        </div>
      </div>
    </div>
  );
}

export default Step3;