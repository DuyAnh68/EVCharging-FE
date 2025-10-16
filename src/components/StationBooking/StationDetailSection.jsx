import "./style.css";
import {LogoIcon, PinIcon} from "../../assets/icons/index.jsx";
import { Button, Popover, Space } from 'antd';
import BookingForm from "./BookingForm.jsx";

const StationDetailSection = () => {
    return (
        <div className="station-detail-section col-span-2">
            <div className="flex flex-col gap-2">
                <div className="title">Activity & Status</div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="card">
                        <div className="header">Working Time</div>
                        <div className="list">
                            <div className="list-item">
                                <div>Mon - Fri</div>
                                <div>06:00 - 22:00</div>
                            </div>
                            <div className="list-item">
                                <div>Sat</div>
                                <div>07:00 - 20:00</div>
                            </div>
                            <div className="list-item">
                                <div>Sun</div>
                                <div>08:00 - 18:00</div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="header">Current Status</div>
                        <div className="list">
                            <div className="list-item">Port A1 - Available</div>
                            <div className="list-item">Port A2 - In Use (15 minutes remaining)</div>
                            <div className="list-item">Port  A3 - Error</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <div className="title">Schedule (Today)</div>
                <div className="card">
                    <div className="schedule-item">
                        <div>06:00</div>
                        <div>Available 39/40</div>
                        <div className="action" >Book</div>
                    </div>
                    <div className="schedule-item">
                        <div>07:00</div>
                        <div>Available 39/40</div>
                        <div className="action">Book</div>
                    </div>
                    <div className="schedule-item">
                        <div>08:00</div>
                        <div>Available 39/40</div>
                        <div className="action">Book</div>
                    </div>
                    <div className="schedule-item">
                        <div>09:00</div>
                        <div>Available 39/40</div>
                        <div className="action">Book</div>
                    </div>
                    <div className="schedule-item">
                        <div>10:00</div>
                        <div>Available 39/40</div>
                        <div className="action">Book</div>
                    </div>
                    <div className="schedule-item">
                        <div>11:00</div>
                        <div>Full</div>
                        <div className="action"></div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 pt-6">
                <Popover placement="bottomLeft" content={<BookingForm/>} title="Book a station" trigger="click">
                    <button className="btn">Book Now</button>
                </Popover>
                <div className="card">
                    <div>Your Booking</div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="header"><strong>Station: EcoCharge - Nguyen Van Cu</strong></div>
                            <div><strong>Slot:</strong> A1 - <strong>Time:</strong> 14:30 - 14:45</div>
                            <div><strong>Vehicle:</strong> ___</div>
                        </div>

                        <div className="px-4">
                            <div className="flex flex-row justify-between items-center">
                                <PinIcon />
                                <strong>1,5 KM</strong>
                                <LogoIcon />
                            </div>
                            <div className="line"></div>
                            <div className="flex flex-row justify-between items-center">
                                <div>Current Location</div>
                                <div>Station</div>
                            </div>
                        </div>

                        <div style={{alignSelf: "center"}}><strong>Note:</strong> Your reservation is only valid for <strong style={{color: "#009951"}}>29:57</strong>. Arriving later will result in cancellation.</div>
                        <div className="btn" style={{alignSelf: "center"}}>Detail</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StationDetailSection;