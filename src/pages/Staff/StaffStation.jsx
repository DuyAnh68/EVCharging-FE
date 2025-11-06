import { useNavigate } from "react-router-dom";
import useStation from "../../hooks/useStation";
import { MapPin, Zap, Power } from "lucide-react";

const StaffStation = () => {
  const navigate = useNavigate();
  const { stations, loading, error } = useStation();

  if (loading)
    return <div className="text-center mt-10 text-gray-600">Đang tải dữ liệu...</div>;

  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        Lỗi khi tải dữ liệu: {error}
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen px-6 py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto w-full">
        <h1 className="text-4xl !font-bold !text-[#14AE5C] !mb-8 text-left">
          Danh sách các trạm sạc
        </h1>

        <div className="space-y-4">
          {stations.map((station) => (
            <div
              key={station.id}
              onClick={() => navigate(`/staff/station/spot/${station.id}`)}
              className="flex items-center justify-between border border-gray-200 bg-white rounded-xl p-4 shadow-sm 
             hover:border-[#14AE5C] hover:shadow-lg hover:scale-[1.02] cursor-pointer 
             transition-all duration-300 ease-in-out"
            >
              {/* Hình ảnh */}
              <div className="flex items-center gap-4">
                <div className="w-28 h-28 rounded-lg overflow-hidden">
                  <img
                    src={
                      station.imageUrl ||
                      "https://greencharge.vn/wp-content/uploads/2023/04/greencharge-38.jpg"
                    }
                    alt={station.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Thông tin */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#14AE5C]" />
                    {station.name}
                  </h2>
                  <p className="text-gray-600 text-sm flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4" />
                    {station.location}
                  </p>

                  <div className="flex items-center mt-2 text-sm">
                    <Power className="w-4 h-4 mr-1 text-gray-400" />
                    <span className="font-medium text-gray-700">
                      {station.powerCapacity} kW
                    </span>
                    <span className="mx-2">•</span>
                    <span
                      className={`font-medium ${
                        station.status === "AVAILABLE"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {station.status === "AVAILABLE"
                        ? "Đang hoạt động"
                        : "Ngưng hoạt động"}
                    </span>
                  </div>

                  {/* Loại trạm */}
                  <div className="mt-2">
                    {/* <span
                      className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                        station.type === "VÃNG LAI"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {station.type || "Không xác định"}
                    </span> */}
                  </div>
                </div>
              </div>

              {/* Nút hành động (chỉ hiển thị nếu là “vãng lai”) */}
              {/* {station.type === "VÃNG LAI" && (
                <button
                  onClick={() =>
                    navigate(`/staff/station/spot/${station.id}`)
                  }
                  className="px-5 py-2 rounded-lg bg-[#14AE5C] text-white font-medium hover:bg-[#109857] transition"
                >
                  Đặt chỗ
                </button>
              )} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffStation;
