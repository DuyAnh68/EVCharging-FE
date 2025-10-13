import { createContext, useState, useEffect } from 'react';

const StepperContext = createContext();

export const StepperProvider = ({ children }) => {
  const savedStep = localStorage.getItem('currentStep');
  const [currentStep, setCurrentStep] = useState(savedStep ? Number(savedStep) : 1);

  useEffect(() => {
    localStorage.setItem('currentStep', currentStep);
  }, [currentStep]);
 
  const value = {
    currentStep,
    setCurrentStep
  }
  return (
    <StepperContext.Provider value={value}>{children}</StepperContext.Provider>
  );
};

export default StepperContext;

