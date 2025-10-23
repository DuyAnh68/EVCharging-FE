import { createContext, useState, useEffect } from 'react';

const StepperContext = createContext();

export const StepperProvider = ({ children }) => {
  const savedStep = localStorage.getItem('currentStep');
  const [currentStep, setCurrentStep] = useState(savedStep ? Number(savedStep) : 1);
  const [vehicleData, setVehicleData] = useState({
    modelId:"",
    subscriptionId:"",
    licensePlate:"",
  });

  useEffect(() => {
    localStorage.setItem('currentStep', currentStep);
  }, [currentStep]);
 
  const value = {
    currentStep,
    setCurrentStep,
    vehicleData,
    setVehicleData
  }
  return (
    <StepperContext.Provider value={value}>{children}</StepperContext.Provider>
  );
};

export default StepperContext;

