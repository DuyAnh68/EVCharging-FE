import React, { useState } from 'react'
import Stepper from './Stepper';

function Steps() {
    const steps = [
        {label: 'Thông tin xe điện'},
        {label: 'Cấu hình sạc'},
        {label: 'Gói thuê bao'},
        {label: 'Hoàn tất'}

    ];

    const [currentStep, setCurrentStep] = useState(1);
  return (
    <div>
        <div className="flex items-center justify-between h-[69px] w-[687px] mx-auto mt-3 relative">             
                {steps.map((step, index) => (
                   <div key={index}  className="flex flex-col items-center justify-between gap-1 ">
                    <Stepper
                        index={index + 1}
                        currentStep={currentStep}
                        isLast={index === steps.length - 1}
                        onClick={() => setCurrentStep(index + 1)}
                    />
                        
                        <div
            className={`text-[15px] mt-2 font-medium ${
              currentStep === index + 1 ? 'text-[#00b35c]' : 'text-gray-600'
            }`}
          >
            {step.label}
          </div>
                   </div>
                ))}  
        </div>
    </div>
  )
}

export default Steps