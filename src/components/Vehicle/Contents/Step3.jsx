import React, { useContext } from 'react'
import { CreditCard } from "lucide-react";
import SubscriptionCart from '../SubscriptionCart';
import StepperContext from '../../../contexts/Vehicle/StepperProvider';

function Step3() {
    const { currentStep, setCurrentStep } = useContext(StepperContext);

    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };
  return (  
    <div>
        <div className="bg-[#D9D9D9] h-[690px] p-6 md:p-10 shadow-sm flex flex-col gap-6 rounded-[36px]">
            <div  className="flex items-center gap-3 ">
                <div className="w-[40px] h-[40px] bg-[#009951] items-center justify-center flex rounded-full">
                    <CreditCard className="text-[black] items-center justify-center flex "/>
                </div>
                <div className="title text-[black] font-bold text-3xl ">Gói thuê bao</div>
            </div>
            <div className="ml-10">
                <p className="text-[black]">Chọn gói phù hợp với nhu cầu sạc xe của bạn</p>
            </div>
            <div className="flex-grow">
                <SubscriptionCart/>
            </div>
            <div className="flex justify-between">
                <button 
                    onClick={handleBack}
                    className="flex items-center justify-center !bg-[#3C3C43] text-[white] font-bold py-3 px-6 rounded-full !hover:bg-green-600">
                    Quay lại
                    </button>
                <button 
                    onClick={handleNext}
                    className="flex items-center justify-center !bg-[#009951] text-[white] font-bold py-3 px-6 rounded-full !hover:bg-green-600">
                    Tiếp tục
                </button>          
            </div>
        </div>
        <div className="flex flex-col bg-[white] mt-5 shadow-sm">
            <div  className="flex justify-left items-start gap-3 pl-3 pt-1">
                <div className="w-[30px] h-[30px] bg-[#009951] items-center justify-center flex rounded-full">
                    <CreditCard className="text-[black] items-center justify-center flex "/>
                </div>
                <div className="text-[black] font-medium text-xl ">Thông tin thanh toán</div>
            </div>
            <div className="pl-12 pt-2 pb-7 text-[black]">
                Bạn có thể đổi hoặc hủy gói bất kỳ lúc nào. Phí sạc thực tế sẽ được tính dựa trên mức giá ưu đãi của gói đã chọn
            </div>
        </div> 
    </div>
         
  )
}

export default Step3