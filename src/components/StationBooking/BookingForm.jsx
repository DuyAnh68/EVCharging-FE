import React from "react";
import {DatePicker, Select, InputNumber} from "antd";

const BookingForm = () => {
    return <div className="booking-form">
        <div className="title">Station: EcoCharge - Nguyen Van Cu</div>
        <div className="body">
            <div className="input-item">
                <div>Time</div>
                <DatePicker
                    showTime
                    onChange={(value, dateString) => console.log(value, dateString)}
                    onOk={() => {
                    }}
                />
            </div>
            <div className="input-item">
                <div>Car type</div>
                <Select
                    placeholder="Select your car type"
                    onChange={() => {}}
                    options={[
                        {
                            value: "V001",
                            label: "Tesla Model 3",
                        },
                        {
                            value: "V002",
                            label: "Tesla Model Y",
                        },
                        {
                            value: "V003",
                            label: "VinFast VF8",
                        },
                        {
                            value: "V004",
                            label: "VinFast VF9",
                        },
                    ]}
                />
            </div>
            <div className="input-item">
                <div>Time (minute)</div>
                <InputNumber addonAfter="minutes" min={1} max={120} defaultValue={1}/>
            </div>
            <button className="btn" style={{alignSelf: "end", marginTop: "16px"}}>Book</button>
        </div>
    </div>
}

export default BookingForm;