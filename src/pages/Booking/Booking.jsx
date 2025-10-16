import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Booking() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    district: "",
    chargerType: "",
    status: "",
    priceRange: "",
  });

  const stations = [
    {
      id: 1,
      name: "CHUNG CƯ HÀ ĐÔ",
      address: "365 Nguyễn Hữu Thọ, P1, Quận 7, TP.HCM",
      image:
        "https://www.bonboncar.vn/blog/content/images/2025/07/danh-sach-tram-sac-vinfast-1-1.png",
      price: 3500,
      district: "Quận 7",
      status: "Trống chỗ",
      chargers: [
        { id: 1, type: "AC", available: true },
        { id: 2, type: "DC", available: true },
      ],
    },
    {
      id: 2,
      name: "CHUNG CƯ VINHOMES",
      address: "720A Điện Biên Phủ, P22, Bình Thạnh, TP.HCM",
      image: "https://thegioiphuongtien.vn/uploaded/H%E1%BA%A7m%20(6).jpg",
      price: 4000,
      district: "Bình Thạnh",
      status: "Hết chỗ",
      chargers: [{ id: 3, type: "AC", available: false }],
    },
    {
      id: 3,
      name: "VINCOM THỦ ĐỨC",
      address: "216 Võ Văn Ngân, Bình Thọ, Thủ Đức, TP.HCM",
      image:
        "https://xeotovinfast.com.vn/wp-content/uploads/2024/06/tram_sac_vinfast_o_quan_thu_duc.webp",
      price: 3800,
      district: "Thủ Đức",
      status: "Trống chỗ",
      chargers: [
        { id: 4, type: "DC", available: true },
        { id: 5, type: "AC", available: true },
      ],
    },
    {
      id: 4,
      name: "AEON MALL TÂN PHÚ",
      address: "30 Bờ Bao Tân Thắng, Sơn Kỳ, Tân Phú, TP.HCM",
      image: "https://oto360.net/images/bai-viet/2023/tram_sac_vinfast.webp",
      price: 3200,
      district: "Tân Phú",
      status: "Bảo trì",
      chargers: [
        { id: 6, type: "DC", available: false },
        { id: 7, type: "AC", available: false },
      ],
    },
  ];

  // Filter options
  const districts = ["Tất cả", "Quận 7", "Bình Thạnh", "Thủ Đức", "Tân Phú"];
  const chargerTypes = ["Tất cả", "AC", "DC"];
  const statusOptions = ["Tất cả", "Trống chỗ", "Hết chỗ", "Bảo trì"];
  const priceRanges = ["Tất cả", "< 3500", "3500-4000", "> 4000"];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredStations = stations.filter((station) => {
    if (
      filters.district &&
      filters.district !== "Tất cả" &&
      station.district !== filters.district
    )
      return false;
    if (
      filters.chargerType &&
      filters.chargerType !== "Tất cả" &&
      !station.chargers.some((c) => c.type === filters.chargerType)
    )
      return false;
    if (
      filters.status &&
      filters.status !== "Tất cả" &&
      station.status !== filters.status
    )
      return false;
    if (filters.priceRange) {
      if (filters.priceRange === "< 3500" && station.price >= 3500)
        return false;
      if (
        filters.priceRange === "3500-4000" &&
        (station.price < 3500 || station.price > 4000)
      )
        return false;
      if (filters.priceRange === "> 4000" && station.price <= 4000)
        return false;
    }
    return true;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Danh sách trạm sạc</h1>

      {/* Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            name="district"
            value={filters.district}
            onChange={handleFilterChange}
            className="border rounded-md p-2"
          >
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>

          <select
            name="chargerType"
            value={filters.chargerType}
            onChange={handleFilterChange}
            className="border rounded-md p-2"
          >
            {chargerTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="border rounded-md p-2"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select
            name="priceRange"
            value={filters.priceRange}
            onChange={handleFilterChange}
            className="border rounded-md p-2"
          >
            {priceRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stations List */}
      <div className="space-y-4">
        {filteredStations.map((station) => (
          <div
            key={station.id}
            className="flex items-center border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-24 h-24 mr-4">
              <img
                src={station.image}
                alt={station.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="flex-grow">
              <h2 className="text-lg font-semibold">{station.name}</h2>
              <p className="text-gray-600 text-sm">{station.address}</p>
              <div className="flex items-center mt-2">
                <span className="text-green-600 font-medium">
                  {station.price}
                </span>
                <span className="mx-2">•</span>
                <span
                  className={`text-sm ${
                    station.status === "Trống chỗ"
                      ? "text-green-500"
                      : "text-orange-500"
                  }`}
                >
                  {station.status}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                {station.chargers.map((charger) => (
                  <div key={charger.id} className="flex items-center">
                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${
                        charger.available ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                    <span>{charger.type}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate(`/station/${station.id}`)}
                disabled={station.status === "Bảo trì"}
                className={`px-4 py-2 rounded transition-colors
    ${
      station.status === "Bảo trì"
        ? "!bg-gray-400 !text-white cursor-not-allowed"
        : "!bg-blue-500 text-white hover:!bg-blue-600"
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
