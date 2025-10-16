import React, { useContext } from 'react'
import { Car } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import YearPicker from '../YearPicker';
import StepperContext from '../../../contexts/Vehicle/StepperProvider';

function VehicleInf() {
    const evBrands = [
    "VinFast",
    "Hyundai",
    "Kia",
    "Toyota",
    "Nissan",
    "Honda",
    "BYD",
    "MG",
    "Chery",
    "Geely",
    "Tesla",
    "Ford",
    "BMW",
    "Mercedes-Benz",
    "Audi",
    "Volkswagen"
  ];

  

  const { currentStep, setCurrentStep } = useContext(StepperContext);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="bg-[#D9D9D9] h-[508px] p-6 md:p-10 shadow-sm flex flex-col gap-6 rounded-[36px]">
        <div  className="flex items-center gap-3 ">
            <div className="w-[40px] h-[40px] bg-[#009951] items-center justify-center flex rounded-full">
                <Car className="text-[black]"/>
            </div>
            <div className="title text-[black] font-bold text-3xl ">Thông tin xe điện</div>
        </div>
        <div className="flex flex-row justify-center">
            <div className="ml-10 mt-5 w-1/2 flex flex-col gap-4 ">
                <div className="flex flex-col gap-1 text-[black] ">
                    <label htmlFor="Name" className="font-medium text-gray-700">Tên xe:</label>
                    <input type="text" id="Name" name="CarName" placeholder="VD: VF e34, Kona Electric"
                    className="w-full border rounded-md px-3 py-2 border-[black] bg-[white]"/> 
                </div>
                <div className="flex flex-col gap-1 text-[black] mt-4">
                    <YearPicker />
                </div>
                <div className="flex flex-col gap-1 text-[black] mt-4">
                    <label htmlFor="Color" className="font-medium text-gray-700">Màu xe:</label>
                    <input type="text" id="Color" name="CarColor" placeholder="VD: Đỏ, Xanh, Vàng"
                    className="w-full border rounded-md px-3 py-2 border-[black] bg-[white]"/>
                </div>
            </div>
            <div className="ml-10 mt-1 w-1/2 flex flex-col gap-4 ">
                <div className="flex flex-col gap-1 text-[black] mt-4">
                    <label htmlFor="Brand" className="font-medium text-gray-700">Hãng xe:</label>
                    <select
                        id="Brand"
                        name="evBrand"
                        className="w-full border rounded-md px-3 py-2 border-[black] bg-[white]"
                    >
                        <option value="">-- Chọn hãng xe điện --</option>
                        {evBrands.map((brand, index) => (
                            <option key={index} value={brand}>
                                {brand}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-1 text-[black] mt-4">
                    <label htmlFor="LicensePlate" className="font-medium text-gray-700">Biển số xe:</label>
                    <input type="text" id="LicensePlate" name="CarLicensePlate" placeholder="VD: 36A - 183636"
                    className="w-full border rounded-md px-3 py-2 border-[black] bg-[white]"/>
                </div>
            </div>
        </div>
        <div className="flex justify-end ">

            <button 
            onClick={handleNext}
            className="flex items-center justify-center !bg-[#009951] text-[white] font-bold py-3 px-6 rounded-full !hover:bg-green-600">
                Tiếp tục
            </button>
        </div>
    </div>
  )
}

export default VehicleInf