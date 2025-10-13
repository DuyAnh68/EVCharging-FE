import React, { useState } from "react";

const SearchForm = () => {
  const [searchData, setSearchData] = useState({
    location: "",
    time: "22/09/2025 10:00 AM",
    chargeType: "Tất cả loại sạc",
  });

  const handleInputChange = (field, value) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search data:", searchData);
  };

  return (
    <div className="search-form-container bg-white rounded-2xl p-6 shadow-lg max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Vị trí
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={searchData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Nhập địa chỉ hoặc tên trạm sạc"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Thời gian */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Thời gian
            </label>
            <input
              type="text"
              value={searchData.time}
              onChange={(e) => handleInputChange("time", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
            />
          </div>

          {/* Loại sạc */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Loại sạc
            </label>
            <div className="relative">
              <select
                value={searchData.chargeType}
                onChange={(e) =>
                  handleInputChange("chargeType", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors appearance-none bg-white"
              >
                <option value="Tất cả loại sạc">Tất cả loại sạc</option>
                <option value="AC 7kW">AC 7kW</option>
                <option value="AC 22kW">AC 22kW</option>
                <option value="DC 50kW">DC 50kW</option>
                <option value="DC 150kW">DC 150kW</option>
                <option value="DC 350kW">DC 350kW</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Nút tìm kiếm */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="!bg-green-500 hover:!bg-green-600 text-white font-medium py-3 px-8 rounded-xl flex items-center space-x-2 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span>Tìm trạm sạc</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
