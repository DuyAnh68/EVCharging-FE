import React from 'react'

function Stepper({index, currentStep, isLast, onClick}) {
  const isCompleted = currentStep > index;
  const isActive = currentStep === index;
  return (
    <div className="relative flex items-center">
      <div
        onClick={onClick}
        className={`w-[38px] h-[38px] flex items-center justify-center rounded-full cursor-pointer font-bold border-2 transition-all duration-200 ${
          isActive
            ? 'bg-[#00b35c] text-white border-[#00b35c]'
            : isCompleted
            ? 'border-[#00b35c] text-[white] bg-[#00b35c]'
            : 'border-gray-300 text-gray-500 bg-white'
        }`}
      >
        {index}
      </div>
      {!isLast && (
        <div
          className={`absolute top-1/2 left-full w-[177px] h-[3px] transform -translate-y-1/2 ${
            currentStep > index ? 'bg-[#00b35c]' : 'bg-gray-300'
          }`}
        ></div>
      )}
    </div>
  )
}

export default Stepper