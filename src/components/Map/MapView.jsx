import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaBolt, FaMapMarkerAlt, FaRoute } from "react-icons/fa";

// Icon marker tùy chỉnh (màu xanh VinFast)
const chargingIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // bạn có thể thay icon khác
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -30],
});

const MapView = ({ station }) => {
  if (!station) return <p>Không có dữ liệu trạm sạc</p>;

  const handleDirections = () => {
    const { latitude, longitude, name } = station;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&destination_place_id=${encodeURIComponent(
      name
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
      <MapContainer
        center={[station.latitude, station.longitude]}
        zoom={16}
        style={{ height: "450px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <Marker
          position={[station.latitude, station.longitude]}
          icon={chargingIcon}
        >
          <Popup>
            <div style={{ minWidth: "220px" }}>
              <h3 className="font-bold text-green-700 text-base mb-1">
                <FaBolt className="inline mr-1 text-yellow-500" />
                {station.name}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                <FaMapMarkerAlt className="inline mr-1 text-red-500" />
                {station.location}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                ⚡ Công suất: <b>{station.powerCapacity} kW</b>
              </p>
              <p className="text-sm text-gray-500 mb-1">
                🔋 Số chỗ sạc trống:{" "}
                <b className="text-green-600">{station.availableSpots}</b>
              </p>
              <p className="text-sm text-gray-500 mb-3">
                🟢 Trạng thái: <b>{station.status}</b>
              </p>

              <button
                onClick={handleDirections}
                className="!bg-green-600 !text-white px-3 py-2 rounded-md w-full flex items-center justify-center hover:bg-green-700 transition"
              >
                <FaRoute className="mr-2" />
                Chỉ đường
              </button>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;
