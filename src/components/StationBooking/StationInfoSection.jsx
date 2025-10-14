import "./style.css";
import React from "react";
import {CheckIcon, CarIcon} from "../../assets/icons/index.jsx";

const StationInfoSection = () => {
    return (
        <div className="station-info-section">
            <div className="img-container">
                <img src={"https://t4.ftcdn.net/jpg/01/93/90/27/360_F_193902732_Rdkidq0xZ0TT6Tdt0kuQUUsue6PQOV5g.jpg"} alt="ecocharge station"/>
            </div>
            <h1 className="title">Station: EcoCharge - Nguyen Van Cu</h1>
            <div className="address">Address: 123 Nguyen Van Cu, District 1, Ho Chi Minh City</div>
            <div className="status-container flex flex-row gap-2">
                <div className="status"><CheckIcon/> Active</div>
                <div className="port-count"><CarIcon/> 40 Ports</div>
                <div className="updated">Updated: 22/09/2025</div>
            </div>
            <div className="section flex flex-col gap-1">
                <div className="header">Description:</div>
                <div>The charging station supports both AC and DC fast charging. It has a spacious parking area, restrooms, and a small café.</div>
            </div>
            <div className="section flex flex-col gap-1">
                <div className="header">Facilities:</div>
                <ul>
                    <li>24/7 access</li>
                    <li>Card & e-wallet payment</li>
                    <li>Monitoring & maintenance system</li>
                </ul>
            </div>

            <div className="section flex flex-col gap-1">
                <div className="header">Contact:</div>
                <div>Hotline: 0900 123 456</div>
            </div>
        </div>
    );
};

export default StationInfoSection;