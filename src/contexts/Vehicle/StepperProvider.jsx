import { createContext, useState } from 'react';

const StepperContext = createContext();

export const StepperProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
 
  const value = {
    currentStep,
    setCurrentStep
  }
  return (
    <StepperProvider.Provider value={value}>{children}</StepperProvider.Provider>
  );
};

export default StepperContext;
