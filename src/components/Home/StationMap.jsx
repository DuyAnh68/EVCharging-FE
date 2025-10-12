import React from "react";
import "./style.css";
import {APIProvider, Map} from '@vis.gl/react-google-maps';
import {useNavigate} from "react-router-dom";
import {GOOGLE_MAP_API_KEY} from "../../constants/index.js";

const mockData = [
    {
        id: 1,
        name: "Vinfast Charging Station",
        address: "123 Nguyen Hue, Q1, Ho Chi Minh",
        distance: "0.5 km",
        image: "https://t4.ftcdn.net/jpg/01/93/90/27/360_F_193902732_Rdkidq0xZ0TT6Tdt0kuQUUsue6PQOV5g.jpg"
    },
    {
        id: 2,
        name: "Vinfast Charging Station",
        address: "123 Nguyen Hue, Q1, Ho Chi Minh",
        distance: "0.5 km",
        image: "https://t4.ftcdn.net/jpg/01/93/90/27/360_F_193902732_Rdkidq0xZ0TT6Tdt0kuQUUsue6PQOV5g.jpg"
    },
    {
        id: 3,
        name: "Vinfast Charging Station",
        address: "123 Nguyen Hue, Q1, Ho Chi Minh",
        distance: "0.5 km",
        image: "https://t4.ftcdn.net/jpg/01/93/90/27/360_F_193902732_Rdkidq0xZ0TT6Tdt0kuQUUsue6PQOV5g.jpg"
    },
    {
        id: 4,
        name: "Vinfast Charging Station",
        address: "123 Nguyen Hue, Q1, Ho Chi Minh",
        distance: "0.5 km",
        image: "https://t4.ftcdn.net/jpg/01/93/90/27/360_F_193902732_Rdkidq0xZ0TT6Tdt0kuQUUsue6PQOV5g.jpg"
    },
    {
        id: 5,
        name: "Vinfast Charging Station",
        address: "123 Nguyen Hue, Q1, Ho Chi Minh",
        distance: "0.5 km",
        image: "https://t4.ftcdn.net/jpg/01/93/90/27/360_F_193902732_Rdkidq0xZ0TT6Tdt0kuQUUsue6PQOV5g.jpg"
    }
];

const StationMap = () => {
    const navigate = useNavigate();

    return (
        <div className="station-map">
            <h1 className="title">Charging Station Map</h1>
            <div className="grid grid-cols-5 gap-4">
                <div className="list col-span-2">
                    {mockData.map((item) => (
                        <div key={item.id} className="station-list-item">
                            <div className="flex flex-col">
                                <h2 className="name">{item.name}</h2>
                                <p className="address">{item.address}</p>
                            </div>

                            <div>
                                <p className="distance-header">Distance:</p>
                                <p className="distance-value">{item.distance}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="map col-span-3">
                    <APIProvider apiKey={GOOGLE_MAP_API_KEY}>
                        <Map
                            style={{width: '100%', height: '100%'}}
                            defaultCenter={{lat: 22.54992, lng: 0}}
                            defaultZoom={3}
                            gestureHandling='greedy'
                            disableDefaultUI
                        />
                    </APIProvider>
                </div>
            </div>


            <h1 className="title">Nearby Charging Stations</h1>
            <div className="grid grid-cols-3 gap-6">
                {
                    mockData?.slice(0, 3)?.map((item) => (
                        <div key={item.id} className="nearby-station-list-item">
                            <div className="station-img">
                                <img src={item?.image} alt="vinfast chargin station"/>
                            </div>
                            <div className="flex flex-col gap-3 p-5 pt-0">
                                <h2 className="name">{item.name}</h2>
                                <p className="address">{item.address}</p>
                                <div className="flex flex-row justify-between">
                                    <p className="distance">{item.distance}</p>
                                    <p className="distance">150kW</p>
                                </div>

                                <div className="flex flex-row justify-between">
                                    <p className="distance">8/12 Available</p>
                                    <p className="distance">3,500 VND/kWh</p>
                                </div>
                                <button className="action" onClick={() => navigate("/booking")}>Book Now</button>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    );
};

export default StationMap;