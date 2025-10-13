import React, { useState, useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const ChargingStationMap = () => {
  const [selectedStation, setSelectedStation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);
  const infoWindowRef = useRef(null);

  // Mock data cho các trạm sạc
  const chargingStations = [
    {
      id: 1,
      name: "Trạm sạc VinFast Hà Nội",
      address: "123 Đường Láng, Đống Đa, Hà Nội",
      coordinates: { lat: 21.0285, lng: 105.8542 },
      type: "DC 150kW",
      status: "available",
      price: "2,500 VND/kWh",
      distance: "1.2 km",
    },
    {
      id: 2,
      name: "Trạm sạc EVN HCM",
      address: "456 Nguyễn Huệ, Q1, TP.HCM",
      coordinates: { lat: 10.7769, lng: 106.7009 },
      type: "AC 22kW",
      status: "busy",
      price: "2,200 VND/kWh",
      distance: "3.5 km",
    },
    {
      id: 3,
      name: "Trạm sạc Tesla Đà Nẵng",
      address: "789 Lê Duẩn, Hải Châu, Đà Nẵng",
      coordinates: { lat: 16.0544, lng: 108.2022 },
      type: "DC 350kW",
      status: "available",
      price: "3,000 VND/kWh",
      distance: "5.8 km",
    },
    {
      id: 4,
      name: "Trạm sạc VinFast Hải Phòng",
      address: "321 Lê Lợi, Ngô Quyền, Hải Phòng",
      coordinates: { lat: 20.8449, lng: 106.6881 },
      type: "DC 50kW",
      status: "maintenance",
      price: "2,300 VND/kWh",
      distance: "2.1 km",
    },
    {
      id: 5,
      name: "Trạm sạc EVN Cần Thơ",
      address: "654 Trần Hưng Đạo, Ninh Kiều, Cần Thơ",
      coordinates: { lat: 10.0452, lng: 105.7469 },
      type: "AC 7kW",
      status: "available",
      price: "2,000 VND/kWh",
      distance: "4.2 km",
    },
  ];

  // Khởi tạo Google Maps
  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: "YOUR_GOOGLE_MAPS_API_KEY", // Thay thế bằng API key thật
        version: "weekly",
        libraries: ["places"],
      });

      try {
        const google = await loader.load();

        // Tạo map
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: { lat: 21.0285, lng: 105.8542 },
          zoom: 12,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        });

        setMap(mapInstance);

        // Tạo InfoWindow
        const infoWindow = new google.maps.InfoWindow();
        infoWindowRef.current = infoWindow;

        // Tạo markers cho các trạm sạc
        const stationMarkers = chargingStations.map((station) => {
          const marker = new google.maps.Marker({
            position: station.coordinates,
            map: mapInstance,
            title: station.name,
            icon: {
              url: getMarkerIcon(station.status),
              scaledSize: new google.maps.Size(32, 32),
            },
          });

          // Thêm event listener cho marker
          marker.addListener("click", () => {
            setSelectedStation(station);
            infoWindow.setContent(createInfoWindowContent(station));
            infoWindow.open(mapInstance, marker);
          });

          return marker;
        });

        setMarkers(stationMarkers);
      } catch (error) {
        console.error("Lỗi khi tải Google Maps:", error);
      }
    };

    initMap();
  }, []);

  // Lấy vị trí người dùng
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);

          // Di chuyển map đến vị trí người dùng
          if (map) {
            map.setCenter(location);
            map.setZoom(15);
          }
        },
        (error) => {
          console.log("Không thể lấy vị trí:", error);
          setUserLocation({ lat: 21.0285, lng: 105.8542 });
        }
      );
    } else {
      setUserLocation({ lat: 21.0285, lng: 105.8542 });
    }
  }, [map]);

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "busy":
        return "bg-yellow-500";
      case "maintenance":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "available":
        return "Có sẵn";
      case "busy":
        return "Đang sử dụng";
      case "maintenance":
        return "Bảo trì";
      default:
        return "Không xác định";
    }
  };

  return (
    <div className="map-container w-full h-96 bg-gray-100 rounded-xl overflow-hidden relative">
      {/* Mock Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
        <div className="text-center text-gray-600">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-lg font-medium">Bản đồ trạm sạc</p>
          <p className="text-sm">Tích hợp Google Maps hoặc OpenStreetMap</p>
        </div>
      </div>

      {/* User Location Marker */}
      {userLocation && (
        <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
          📍 Vị trí của bạn
        </div>
      )}

      {/* Charging Stations List */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm max-h-80 overflow-y-auto">
        <h3 className="font-semibold text-gray-800 mb-3">Trạm sạc gần bạn</h3>
        <div className="space-y-3">
          {chargingStations.map((station) => (
            <div
              key={station.id}
              className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                selectedStation?.id === station.id
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 bg-white"
              }`}
              onClick={() => setSelectedStation(station)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 text-sm">
                    {station.name}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    {station.address}
                  </p>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className="text-xs text-gray-500">
                      {station.distance}
                    </span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">
                      {station.type}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div
                    className={`w-3 h-3 rounded-full ${getStatusColor(
                      station.status
                    )}`}
                    title={getStatusText(station.status)}
                  ></div>
                  <span className="text-xs text-gray-600 mt-1">
                    {station.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Station Details Modal */}
      {selectedStation && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">
                {selectedStation.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {selectedStation.address}
              </p>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center space-x-1">
                  <div
                    className={`w-2 h-2 rounded-full ${getStatusColor(
                      selectedStation.status
                    )}`}
                  ></div>
                  <span className="text-xs text-gray-600">
                    {getStatusText(selectedStation.status)}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {selectedStation.type}
                </span>
                <span className="text-xs text-gray-500">
                  {selectedStation.distance}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-bold text-green-600">
                  {selectedStation.price}
                </span>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Đặt chỗ
                </button>
              </div>
            </div>
            <button
              onClick={() => setSelectedStation(null)}
              className="ml-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
        <button className="bg-white hover:bg-gray-50 p-2 rounded-lg shadow-lg transition-colors">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button className="bg-white hover:bg-gray-50 p-2 rounded-lg shadow-lg transition-colors">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChargingStationMap;
