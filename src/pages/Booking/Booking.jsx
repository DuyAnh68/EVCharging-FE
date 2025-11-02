import { useNavigate } from "react-router-dom";
import useStation from "../../hooks/useStation";

function Booking() {
  const navigate = useNavigate();
  const { stations, loading, error } = useStation();
  console.log(stations);

  if (loading)
    return <div className="text-center mt-10">Đang tải dữ liệu...</div>;
  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        Lỗi khi tải dữ liệu: {error}
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Danh sách trạm sạc</h1>

      <div className="space-y-4">
        {stations.map((station) => (
          <div
            key={station.id}
            className="flex items-center border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-24 h-24 mr-4">
              <img
                src={
                  station.image ||
                  "https://greencharge.vn/wp-content/uploads/2023/04/greencharge-38.jpg"
                }
                alt={station.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="flex-grow">
              <h2 className="text-lg font-semibold">{station.name}</h2>
              <p className="text-gray-600 text-sm">{station.location}</p>
              <div className="flex items-center mt-2">
                <span className="text-green-600 font-medium">
                  {station.powerCapacity} kW
                </span>
                <span className="mx-2">•</span>
                <span
                  className={`text-sm ${
                    station.status === "AVAILABLE"
                      ? "text-green-500"
                      : station.status === "maintenance"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {station.status === "AVAILABLE"
                    ? "Đang hoạt động"
                    : "Ngưng hoạt động"}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(`/station/${station.id}`)}
                disabled={station.status !== "AVAILABLE"}
                className={`px-4 py-2 rounded transition-colors ${
                  station.status !== "AVAILABLE"
                    ? "!bg-gray-400 !text-white cursor-not-allowed"
                    : "!bg-[#0F9456] text-white hover:!bg-[#109857]"
                }`}
              >
                ĐẶT CHỖ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Booking;
