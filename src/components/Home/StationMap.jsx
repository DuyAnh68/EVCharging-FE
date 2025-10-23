import React from "react";
import "./style.css";
import {APIProvider, Map} from '@vis.gl/react-google-maps';
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
    return (
        <div className="station-map">
            <h1 className="title">Bản đồ trạm sạc</h1>
            <div className="grid grid-cols-5 gap-4">
                <div className="list col-span-2">
                    {mockData.map((item) => (
                        <div key={item.id} className="station-list-item">
                            <div className="flex flex-col">
                                <h2 className="name">{item.name}</h2>
                                <p className="address">{item.address}</p>
                            </div>

                            <div>
                                <p className="distance-header">Khoảng cách:</p>
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
        </div>
    );
};

export default StationMap;