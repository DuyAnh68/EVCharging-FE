import React, { useContext, useEffect } from "react";
import { Car } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import YearPicker from "../YearPicker";
import StepperContext from "../../../contexts/Vehicle/StepperProvider";
import useVehicle from "../../../hooks/useVehicle";

function VehicleInf() {
  const evBrands = ["VINFAST", "BYD"];

  const { getVehicleByBrand, loading } = useVehicle();
  const [modelList, setModelList] = useState([]);
  const [connector, setConnector] = useState("");
  const [batteryCapacity, setBatteryCapacity] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  const { currentStep, setCurrentStep } = useContext(StepperContext);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBrandChange = async (e) => {
    const brand = e.target.value;
    setSelectedBrand(brand);
    setSelectedModel("");
    setConnector("");
    setBatteryCapacity("");

    if (!brand) {
      setModelList([]);
      return;
    }

    const data = await getVehicleByBrand(brand);

    if (data && Array.isArray(data)) {
      setModelList(data);
    }
  };

  const handleModelChange = (e) => {
    const modelName = e.target.value;
    setSelectedModel(modelName);

    const selected = modelList.find((m) => m.modelName === modelName);
    if (selected) {
      setConnector(selected.connector || "");
      setBatteryCapacity(selected.batteryCapacity || "");
    } else {
      setConnector("");
      setBatteryCapacity("");
    }
  };

  return (
    <div className="bg-[#D9D9D9] h-[508px] p-6 md:p-10 shadow-sm flex flex-col gap-6 rounded-[36px]">
      <div className="flex items-center gap-3 ">
        <div className="w-[40px] h-[40px] bg-[#009951] items-center justify-center flex rounded-full">
          <Car className="text-[black]" />
        </div>
        <div className="title text-[black] font-bold text-3xl ">
          Thông tin xe điện
        </div>
      </div>
      <div className="flex flex-row justify-center">
        {/* Cột trái */}
        <div className="ml-10 mt-5 w-1/2 flex flex-col gap-4 ">
          {/* Hãng xe */}
          <div className="flex flex-col gap-1 text-[black] ">
            <label htmlFor="Brand" className="font-medium text-gray-700">
              Hãng xe:
            </label>
            <select
              id="Brand"
              name="evBrand"
              value={selectedBrand}
              onChange={handleBrandChange}
              className="w-full border rounded-md px-3 py-2 border-[black] bg-[white]"
              disabled={loading}
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
            {/* Cổng sạc */}
            <label htmlFor="ChargeType" className="font-medium text-gray-700">
              Loại cổng sạc:
            </label>
            <input
              id="ChargeType"
              name="ChargeType"
              value={connector}
              readOnly
              className="w-full border rounded-md px-3 py-2 border-[black] bg-[white]"
            />
          </div>
          <div className="flex flex-col gap-1 text-[black] mt-4">
            {/* Dung lượng */}
            <label htmlFor="Battery" className="font-medium text-gray-700">
              Dung lượng :
            </label>
            <input
              id="Battery"
              name="BatteryCapacity"
              value={batteryCapacity ? `${batteryCapacity} kWh` : ""}
              readOnly
              className="w-full border rounded-md px-3 py-2 border-[black] bg-[white]"
            />
          </div>
        </div>
        <div className="ml-10 mt-1 w-1/2 flex flex-col gap-4 ">
          <div className="flex flex-col gap-1 text-[black] mt-4">
            <label htmlFor="ModelName" className="font-medium text-gray-700">
              Tên xe:
            </label>
            <select
              id="ModelName"
              name="modelName"
              value={selectedModel}
              onChange={handleModelChange}
              className="w-full border rounded-md px-3 py-2 border-[black] bg-[white]"
              disabled={!modelList}
            >
              <option value="">-- Chọn mẫu xe --</option>
              {modelList.map((model, index) => (
                <option key={index} value={model.modelName}>
                  {model.modelName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1 text-[black] mt-4">
            <label htmlFor="LicensePlate" className="font-medium text-gray-700">
              Biển số xe:
            </label>
            <input
              type="text"
              id="LicensePlate"
              name="CarLicensePlate"
              placeholder="VD: 36A - 183636"
              className="w-full border rounded-md px-3 py-2 border-[black] bg-[white]"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end ">
        <button
          onClick={handleNext}
          className="flex items-center justify-center !bg-[#009951] text-[white] font-bold py-3 px-6 rounded-full !hover:bg-green-600"
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
}

export default VehicleInf;
