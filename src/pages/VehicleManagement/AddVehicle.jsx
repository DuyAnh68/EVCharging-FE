import React from 'react'
import { Outlet, Link } from "react-router-dom";
import Steps from '../../components/Vehicle/Steps/Steps';


function AddVehicle() {
    
  return (
    <div className="bg-[#F6F9EE] p-10">
        <div className="flex flex-col items-center justify-top  bg-[red]">
            <div className="title text-[black] text-4xl font-bold">Logo</div>
            <div className="text-[black] text-3xl font-medium">Đăng ký xe điện của bạn</div>
        </div>
        <div className="middle h-screen flex flex-col items-center justify-center gap-15">
            <div className="text-[black]">
                <Steps/>
            </div>
            <div className="bg-[#D9D9D9] h-[508px] w-full max-w-5xl mx-auto p-6 md:p-10 shadow-sm flex flex-col gap-6 rounded-[36px]"></div>
        </div>
    </div>

  )
}

export default AddVehicle