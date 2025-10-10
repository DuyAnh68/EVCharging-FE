import React from 'react'
import { Outlet, Link } from "react-router-dom";
import Steps from '../../components/Vehicle/Steps/Steps';
import ContentStep from '../../components/Vehicle/ContentStep';
import { StepperProvider } from '../../contexts/Vehicle/StepperProvider';


function AddVehicle() {
    
  return (
    <div className="bg-[#F6F9EE] flex flex-col gap-3 p-10">
        <div className="flex flex-col items-center mb-10">
            <div className="title text-[black] text-4xl font-bold">Logo</div>
            <div className="text-[black] text-3xl font-medium">Đăng ký xe điện của bạn</div>
        </div>
        <div className="middle flex flex-1 flex-col items-center justify-center gap-10">
            
              <StepperProvider>
                <Steps/>
                <div className="w-full max-w-5xl mx-auto">
                  <ContentStep/>
                </div>
                 
              </StepperProvider>
            
            
        </div>
    </div>

  )
}

export default AddVehicle