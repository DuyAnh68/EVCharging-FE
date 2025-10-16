import React, { useContext } from 'react'
import StepperContext from '../../../contexts/Vehicle/StepperProvider';
import { useNavigate } from 'react-router-dom';

function Step4() {
  const { currentStep, setCurrentStep } = useContext(StepperContext); 
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 4) {
      setCurrentStep(currentStep - 3);
    }
    navigate("/vehicle");
  };

  return (
    <div className="flex flex-col items-center justify-center text-black py-8">
      <div className="text-2xl font-bold text-[#14AE5C] mb-4">
        Đăng ký xe thành công!
      </div>
      <div className="mb-6 text-gray-700">
        Xe của bạn đã được thêm vào danh sách. Bạn có thể xem chi tiết hoặc quản lý xe trong trang danh sách xe.
      </div>
      <button
        onClick={handleNext}
        className="bg-[#009951] text-white px-6 py-2 rounded hover:bg-[#00b35c] transition"
      >
        Quay về danh sách xe
      </button>
    </div>
  );
}

export default Step4