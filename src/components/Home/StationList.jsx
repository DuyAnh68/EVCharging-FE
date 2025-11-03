import React from "react";
import {useNavigate} from "react-router-dom";
import {Spin} from 'antd';

const StationList = ({data = [], loading = false}) => {
    const navigate = useNavigate();

    return (
        <div className="station-list">
            <h1 className="title">Trạm sạc gần bạn</h1>
            {loading && <Spin/>}

            {!loading && !data?.length && <div className="text-center py-2">Không tìm thấy trạm sạc</div>}

            {!loading && data?.length > 0 && <div className="grid grid-cols-3 gap-6">
                {
                    data?.map((item) => (
                        <div key={item.id} className="nearby-station-list-item">
                            <div className="station-img">
                                <img
                                    src={item?.imageUrl || "https://t4.ftcdn.net/jpg/01/93/90/27/360_F_193902732_Rdkidq0xZ0TT6Tdt0kuQUUsue6PQOV5g.jpg"}
                                    alt="vinfast chargin station"/>
                            </div>
                            <div className="flex flex-col gap-3 p-5 pt-0">
                                <h2 className="name">{item?.name}</h2>
                                <p className="address">{item?.location}</p>
                                <div className="flex flex-row justify-between">
                                    <p className="distance">{item?.distance || 0} km</p>
                                    <p className="distance">{item?.powerCapacity || 0} kW</p>
                                </div>

                                <div className="flex flex-row justify-between">
                                    <p className="distance">{item?.availableSpots || 0}/{item?.spots?.length || 0} có
                                        sẵn</p>
                                    <p className="distance">3,500 VND/kWh</p>
                                </div>
                                <button className="action" onClick={() => navigate(`/station/${item?.id}`)}>
                                    Đặt chỗ ngay
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>}
        </div>);
};

export default StationList;
