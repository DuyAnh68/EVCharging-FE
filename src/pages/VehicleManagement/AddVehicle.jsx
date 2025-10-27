import React, { useEffect, useContext }  from 'react'
import { Outlet, Link } from "react-router-dom";
import Steps from '../../components/Vehicle/Steps/Steps';
import ContentStep from '../../components/Vehicle/ContentStep';
import StepperContext, { StepperProvider } from '../../contexts/Vehicle/StepperProvider';

const Reset = () => {
  const { setCurrentStep, setVehicleData } = useContext(StepperContext);

  useEffect(() => {
    setCurrentStep(1);

    
    setVehicleData({
      modelId: null,
      licensePlate: "",
      subscriptionId: null,
      unpaidMessage: null,
    });
  }, []);

  return null;
};

function AddVehicle() {
    
  return (
    <div className="bg-[#F6F9EE] flex flex-col gap-3 p-10">
        <div className="flex flex-col items-center mb-10">
            {/* <div className="title text-[black] text-4xl font-bold">Logo</div> */}
            <div className="title text-[black] text-4xl font-bold">Đăng ký xe điện của bạn</div>
        </div>
        <div className="middle flex flex-1 flex-col items-center justify-center gap-10">
            
              <StepperProvider>
                <Reset/>
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