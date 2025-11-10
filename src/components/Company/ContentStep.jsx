import React from 'react'
import StepperContext from '../../contexts/Vehicle/StepperProvider';
import { useContext } from 'react';
import Step1 from './Contents/Step1';
// import Step2 from './Contents/Step2';
import Step3 from './Contents/Step3';
import Step4 from './Contents/Step4';

function ContentStep() {
    const {currentStep} = useContext(StepperContext);
    console.log(currentStep);

    const handleRenderContet = () => {
        switch(currentStep){
            case 1:
                return <div><Step1/></div>  
            case 2:  
                return <div><Step3/></div>
            case 3:  
                return <div><Step4/></div>    
            default:
                return <Step1/>;    
        }
    };
  return (
    <div>{handleRenderContet()}</div>
  )
}

export default ContentStep