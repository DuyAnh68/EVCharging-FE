import React from 'react'

function Steps() {
    const steps = [
        {label: 'Chọn xe điện'},
        {label: 'Cấu hình sạc'},
        {label: 'Gói thuê bao'},
        {label: 'Hoàn tất'}

    ];
  return (
    <div>
        <div className="flex items-center justify-between h-[69px] w-[687px] mx-auto mt-3 relative">  
            {/* <div className="absolute top-1/2 left-0 w-full h-[2px] !bg-[red] -z-10"></div>           */}
                {steps.map((step, index) => (
                   <div key={index}  className="flex flex-col items-center justify-between gap-1">
                        <div className="w-[38px] h-[38px] flex items-center justify-center rounded-full bg-[#00b35c] text-black font-bold">
                            {index+1}
                        </div>
                        <div className="text-[15px] mt-2 font-medium text-[black] ">
                            {step.label}
                        </div>
                        {index < steps.length - 1 && (
                            <div className="absolutebg-[red] w-[152px] h-[3px]"></div>
                        )}
                   </div>
                ))}  
        </div>
    </div>
  )
}

export default Steps