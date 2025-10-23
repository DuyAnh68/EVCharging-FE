import React, { useContext, useEffect, useState } from "react";
import { CreditCard } from "lucide-react";
import SubscriptionCard from "../SubscriptionCard";
import StepperContext from "../../../contexts/Vehicle/StepperProvider";
import useSubscription from "../../../hooks/useSubscription";
import useVehicle from "../../../hooks/useVehicle";
import Popup from "./Popup";
import usePayment from "../../../hooks/usePayment";
import { useNavigate } from "react-router-dom";

function Step3() {
  const { currentStep, setCurrentStep, vehicleData, setVehicleData } =
    useContext(StepperContext);
  const { getSubscriptions, subscriptions, loading, error } = useSubscription();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { addVehicle } = useVehicle();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const { createPayment } = usePayment();
  const [paymentId, setPaymentId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getSubscriptions();
  }, []);

  const handelSelectPlan = (planId) => {
    console.log("planid", planId);
    setSelectedPlan(planId);

    setVehicleData((prev) => ({ ...prev, subscriptionId: planId }));
  };

  // setVehicle({
  //     modelId: vehicleData.modelId,
  //     licensePlate: vehicleData.licensePlate,
  //     subscriptionPlanId: vehicleData.subscriptionId,
  //   });

  const handleNext = async () => {
    if (!selectedPlan) {
      alert("Vui lòng chọn gói thuê bao trước khi tiếp tục!");
      return;
    }

    console.log("first");
    try {
      const response = await addVehicle({
        modelId: vehicleData.modelId,
        licensePlate: vehicleData.licensePlate,
        subscriptionPlanId: selectedPlan,
      });
      console.log("response: ", response);
      if (response) {
        setPaymentId(response.paymentTransactionId);
        setPopupMessage(`Xe đã được thêm thành công!`);
        setShowPopup(true);
      } else {
        setPopupMessage("Không thể thêm xe. Vui lòng thử lại!");
        setShowPopup(true);
      }
    } catch (e) {
      console.log("e: ", e.message);
      setPopupMessage("Đã xảy ra lỗi trong quá trình thêm xe!");
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

      console.log("url:", response);
      if (response) {
        window.open(response.paymentUrl, "_blank");
      }
    } catch (e) {}
  };

  return (
    <div>
      <div className="bg-[#D9D9D9] h-[690px] p-6 md:p-10 shadow-sm flex flex-col gap-6 rounded-[36px]">
        <div className="flex items-center gap-3 ">
          <div className="w-[40px] h-[40px] bg-[#009951] items-center justify-center flex rounded-full">
            <CreditCard className="text-[black] items-center justify-center flex " />
          </div>
          <div className="title text-[black] font-bold text-3xl ">
            Gói thuê bao
          </div>
        </div>
        <div className="ml-10">
          <p className="text-[black]">
            Chọn gói phù hợp với nhu cầu sạc xe của bạn
          </p>
        </div>
        <div className="flex flex-grow justify-center gap-[20px]">
          {loading ? (
            <p>Đang tải gói thuê bao...</p>
          ) : error ? (
            <p className="text-red-600">Lỗi: {error}</p>
          ) : (
            subscriptions?.map((s) => (
              <SubscriptionCard
                key={s.id}
                data={s}
                selectedPlan={selectedPlan}
                onSelect={() => handelSelectPlan(s.id)}
              />
            ))
          )}
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="flex items-center justify-center !bg-[#3C3C43] text-[white] font-bold py-3 px-6 rounded-full !hover:bg-green-600"
          >
            Quay lại
          </button>
          <button
            onClick={handleNext}
            className="flex items-center justify-center !bg-[#009951] text-[white] font-bold py-3 px-6 rounded-full !hover:bg-green-600"
          >
            Tiếp tục
          </button>
          {showPopup && (
            <Popup message={popupMessage} onClose={handlePayment} />
          )}
        </div>
      </div>
      <div className="flex flex-col bg-[white] mt-5 shadow-sm">
        <div className="flex justify-left items-start gap-3 pl-3 pt-1">
          <div className="w-[30px] h-[30px] bg-[#009951] items-center justify-center flex rounded-full">
            <CreditCard className="text-[black] items-center justify-center flex " />
          </div>
          <div className="text-[black] font-medium text-xl ">
            Thông tin thanh toán
          </div>
        </div>
        <div className="pl-12 pt-2 pb-7 text-[black]">
          Bạn có thể đổi hoặc hủy gói bất kỳ lúc nào. Phí sạc thực tế sẽ được
          tính dựa trên mức giá ưu đãi của gói đã chọn
        </div>
      </div>
    </div>
  );
}

export default Step3;
