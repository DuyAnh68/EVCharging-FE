import React from "react";
import "./style.css";
import { Input, Select, DatePicker } from 'antd';
import {LocationIcon, SearchIcon} from "../../assets/icons/index.jsx";

const StationSearch = () => {

    return <div className="station-search">
        <h1 className="title">Find nearby charging stations</h1>
        <div className="desc">Explore charging stations over the country</div>
        <div className="search-box">
            <div className="search-filters grid grid-cols-3 gap-4">
                <Input placeholder="Enter address or station name" prefix={<LocationIcon />} />
                <DatePicker
                    showTime
                    onChange={(value, dateString) => console.log(value, dateString)}
                    onOk={() => {}}
                />
                <Select
                    placeholder="Select station type"
                    onChange={() => {}}
                    options={[
                        { value: '1', label: 'Type 01' },
                        { value: '2', label: 'Type 02' },
                        { value: '3', label: 'Type 03' },
                    ]}
                />
            </div>
            <button className="search-btn"><SearchIcon/>Search</button>
        </div>

    </div>
}

export default StationSearch;