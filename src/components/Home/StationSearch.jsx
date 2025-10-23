import React from "react";
import "./style.css";
import { Input, Select, DatePicker } from 'antd';
import {LocationIcon, SearchIcon} from "../../assets/icons/index.jsx";

const StationSearch = ({value = "", onChange = () => {}, onSearch = () => {}}) => {

    return <div className="station-search">
        <h1 className="title">Tìm trạm sạc gần bạn</h1>
        <div className="desc">Khám phá và đặt chỗ tại hàng nghìn trạm sạc xe điện trên toàn quốc</div>
        <div className="search-box">
            <div className="search-filters grid grid-cols-3 gap-4">
                <Input value={value} onChange={(e) => onChange(e.target?.value)} placeholder="Nhập địa chỉ hoặc tên trạm sạc" prefix={<LocationIcon />} />
                <DatePicker
                    showTime
                    onChange={(value, dateString) => console.log(value, dateString)}
                    onOk={() => {}}
                    placeholder="Chọn thời gian"
                />
                <Select
                    placeholder="Chọn loại sạc"
                    onChange={() => {}}
                    options={[
                        { value: '1', label: 'Loại 01' },
                        { value: '2', label: 'Loại 02' },
                        { value: '3', label: 'Loại 03' },
                    ]}
                />
            </div>
            <button className="search-btn" onClick={() => onSearch(value)}><SearchIcon/>Tìm trạm sạc</button>
        </div>

    </div>
}

export default StationSearch;