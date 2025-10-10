import React, { useContext } from 'react'
import { BatteryFull, Battery } from "lucide-react";
import StepperContext from '../../../contexts/Vehicle/StepperProvider';

function Step2() {
    const ChargeType =[
        "AC Type 1",
        "AC Type 2",
        "DC (CCS2)",
        "CHAdeMO",
        "Tesla Supercharger" 
    ]

    const BatteryCapacity = [
        
        "90 kWh",
        "100 kWh",
        "120 kWh",
        "150 kWh",
        "200 kWh",
    ]

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
        <div className="bg-[#D9D9D9] h-[508px] p-6 md:p-10 shadow-sm flex flex-col gap-6 rounded-[36px]">
        <div  className="flex items-center gap-3 ">
            <div className="w-[40px] h-[40px] bg-[#009951] items-center justify-center flex rounded-full">
                <Battery className="text-[black] items-center justify-center flex "/>
            </div>
            <div className="title text-[black] font-bold text-3xl ">Cấu hình sạc</div>
        </div>
        <div className="ml-10">
            <p className="text-[black]">Thông tin về cổng sạc và dung lượng pin của xe </p>
        </div>
        <div className="flex flex-row justify-center">
            <div className="ml-10 mt-5 w-1/2 flex flex-col gap-4" >
                <div className="flex flex-col gap-1 text-[black] ">
                    <label htmlFor="ChargeType" className="font-medium text-gray-700">Loại cổng sạc:</label>
                    <select
                        id="ChargeType"
                        name="ChargeType"
                     className="w-full border rounded-md px-3 py-2 border-[black] bg-[white]"
                     >
                        <option>---Chọn loại cổng sạc---</option>
                        {ChargeType.map((type, index)=>(
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select> 
                    <p className="text-sm text-gray-500 mt-2">Kiểm tra loại cổng sạc trên xe hoặc trong sổ tay hướng dẫn</p>    
                </div>
            </div>
            <div className="ml-10 mt-5 w-1/2 flex flex-col gap-4">
                <div className="flex flex-col gap-1 text-[black] ">
                    <label htmlFor="ChargeType" className="font-medium text-gray-700">Dung lượng :</label>
                    <select
                        id="ChargeType"
                        name="ChargeType"
                     className="w-full border rounded-md px-3 py-2 border-[black] bg-[white]"
                     
                     >
                        <option>---Chọn dung lượng pin---</option>
                        {BatteryCapacity.map((type, index)=>(
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select> 
                    <p className="text-sm text-gray-500 mt-2">Dung lượng pin ảnh hưởng đến thời gian sạc</p>    
                </div>
            </div>
        </div>
        <div  className="flex items-center gap-3 ">
            <div className="">
                <Battery className="text-[black] items-center justify-center flex "/>
            </div>
            <div className="title text-[black] font-bold ">Lưu ý về cổng sạc</div>
        </div>
        <div className="text-[black]"><p>Hầu hết xe điện tại Việt Nam sử dụng cổng Type 2 (AC) hoặc CCS2 (DC). Nếu không chắc chắn, vui lòng kiểm tra thông số kỹ thuật của xe.</p></div>
        <div className="flex justify-between ">
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
    </div>
    
  )
}

export default Step2