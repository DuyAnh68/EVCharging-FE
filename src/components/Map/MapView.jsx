import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaBolt, FaMapMarkerAlt, FaRoute } from "react-icons/fa";

const chargingIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
});

const MapView = ({ station }) => {
  console.log(station);

  if (!station) {
    return (
      <div className="flex items-center justify-center h-96 bg-gradient-to-br from-slate-100 to-gray-200 rounded-3xl border-2 border-dashed border-gray-300">
        <div className="text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <p className="text-gray-500 font-semibold text-lg">
            Không có dữ liệu trạm sạc
          </p>
        </div>
      </div>
    );
  }

  const handleDirections = () => {
    const { latitude, longitude, name } = station;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&destination_place_id=${encodeURIComponent(
      name
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-200">
      <MapContainer
        center={[station.latitude, station.longitude]}
        zoom={20}
        style={{ height: "500px", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <Marker
          position={[station.latitude, station.longitude]}
          icon={chargingIcon}
        >
          <Popup className="custom-popup" minWidth={280} maxWidth={320}>
            <div className="p-2">
              {/* Header */}
              <div className="mb-4 pb-3 border-b-2 border-emerald-100">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <FaBolt className="text-white text-xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg leading-tight mb-1">
                      {station.name}
                    </h3>
                    <div className="flex items-start gap-1 text-gray-600 text-sm">
                      <FaMapMarkerAlt className="text-red-500 mt-1 flex-shrink-0" />
                      <span className="leading-tight">{station.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Cards */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">⚡</span>
                    <span className="text-sm text-gray-700 font-medium">
                      Công suất
                    </span>
                  </div>
                  <span className="font-bold text-amber-600 text-lg">
                    {station.powerCapacity} kW
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🔋</span>
                    <span className="text-sm text-gray-700 font-medium">
                      Chỗ trống
                    </span>
                  </div>
                  <span className="font-bold text-emerald-600 text-lg">
                    {station.totalSpotsOnline}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🟢</span>
                    <span className="text-sm text-gray-700 font-medium">
                      Trạng thái
                    </span>
                  </div>
                  <span
                    className={`font-bold text-lg ${
                      station.status === "AVAILABLE"
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {station.status === "Active" ? "Hoạt động" : station.status}
                  </span>
                </div>
              </div>

              {/* Direction Button */}
              <button
                onClick={handleDirections}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <FaRoute className="text-lg" />
                <span>Chỉ đường đến đây</span>
              </button>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;
