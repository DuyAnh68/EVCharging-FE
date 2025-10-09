import React from 'react'
import StepperContext from '../../contexts/Vehicle/StepperProvider'
import { useContext } from 'react';

function ContentStep() {
    const {currentStep} = useContext(StepperContext);
    console.log(currentStep);

    const handleRenderContet = () => {
        switch(currentStep){
            case 1:
                return <div>Step 1</div>   
            case 2:  
                return <div>Step 2</div>       
        }
    };
  return (
    <div>{handleRenderContet()}</div>
  )
}

export default ContentStep