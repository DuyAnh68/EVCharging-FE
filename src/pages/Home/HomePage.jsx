import React, { useMemo, useState } from "react";
import { Search, MapPin, Zap } from "lucide-react";
import { motion } from "framer-motion";
import useStation from "../../hooks/useStation";
import MapView from "../../components/Map/MapView";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

console.log(motion);

const HomePage = () => {
  const { stations, loading } = useStation();
  const [selectedStation, setSelectedStation] = useState(null);
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => setIndex(selectedIndex);

  const [filters, setFilters] = useState({
    keyword: "",
    power: "all",
  });

  const filteredStations = useMemo(() => {
    return stations.filter((s) => {
      const matchKeyword =
        filters.keyword.trim() === "" ||
        s.name.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        s.location.toLowerCase().includes(filters.keyword.toLowerCase());

      const matchPower =
        filters.power === "all" || s.powerCapacity === Number(filters.power);

      return matchKeyword && matchPower;
    });
  }, [stations, filters]);

  const powerOptions = [...new Set(stations.map((s) => s.powerCapacity))];

  return (
    <motion.div
      className="min-h-screen min-w-screen pb-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.section
        className="text-center py-12 px-4"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Tìm trạm sạc gần bạn
        </h1>
        <p className="text-gray-600 mb-8">
          Khám phá và đặt lịch tại hàng nghìn trạm sạc xe điện trên toàn quốc
        </p>

        <motion.div
          className="bg-white shadow-xl rounded-xl px-6 py-6 max-w-7xl mx-auto"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="relative text-left">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vị trí
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Nhập địa chỉ hoặc tên trạm..."
                  value={filters.keyword}
                  onChange={(e) =>
                    setFilters({ ...filters, keyword: e.target.value })
                  }
                  className="w-full border border-gray-300 pl-10 pr-4 py-2.5 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
            </div>

            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loại sạc
              </label>
              <select
                value={filters.power}
                onChange={(e) =>
                  setFilters({ ...filters, power: e.target.value })
                }
                className="w-full border border-gray-300 px-4 py-2.5 rounded-md focus:ring-2 focus:ring-green-500 outline-none bg-white"
              >
                <option value="all">Tất cả công suất</option>
                {powerOptions.map((p) => (
                  <option key={p} value={p}>
                    {p} kW
                  </option>
                ))}
              </select>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/booking")}
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition font-medium flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            Tìm trạm sạc
          </motion.button>
        </motion.div>
      </motion.section>

      {/* MAP SECTION */}
      <motion.section
        className="bg-white rounded-xl shadow-lg max-w-7xl mx-auto p-6 mb-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Bản đồ trạm sạc
        </h2>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Danh sách trạm */}
          <div className="lg:w-2/5 max-h-[500px] overflow-y-auto pr-2">
            {loading ? (
              <p className="text-gray-500 text-center mt-10">Đang tải...</p>
            ) : filteredStations.length === 0 ? (
              <p className="text-gray-500 text-center mt-10">
                Không có trạm phù hợp
              </p>
            ) : (
              <motion.div
                className="space-y-3"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.08 },
                  },
                }}
              >
                {filteredStations.map((s) => (
                  <motion.div
                    key={s.id}
                    onClick={() => setSelectedStation(s.id)}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ scale: 1 }}
                    className={`p-4 rounded-lg cursor-pointer border-2 transition ${
                      selectedStation === s.id
                        ? "bg-green-50 border-green-500"
                        : "bg-white border-gray-200 hover:border-green-300"
                    }`}
                  >
                    <h3 className="font-semibold text-gray-800 text-lg mb-1">
                      {s.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 flex items-start gap-1">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      {s.location}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Zap className="w-4 h-4" />
                        {s.powerCapacity} kW
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Bản đồ */}
          <motion.div
            className="lg:w-3/5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {selectedStation ? (
              <MapView
                station={
                  stations.find((s) => s.id === selectedStation) || stations[0]
                }
              />
            ) : stations.length > 0 ? (
              <MapView station={stations[0]} />
            ) : (
              <div className="flex items-center justify-center h-[500px] bg-gray-100 rounded-lg text-gray-500">
                Chưa có dữ liệu trạm
              </div>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* NEARBY STATIONS */}
      <motion.section
        className="max-w-7xl mx-auto px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Trạm sạc gần bạn
        </h2>

        {loading ? (
          <p className="text-gray-500 text-center">Đang tải...</p>
        ) : stations.length === 0 ? (
          <p className="text-gray-500 text-center">Không có trạm sạc nào</p>
        ) : (
          <Carousel
            interval={3000}
            indicators={true}
            controls={true}
            activeIndex={index}
            onSelect={handleSelect}
          >
            {Array.from({ length: Math.ceil(stations.length / 3) }).map(
              (_, i) => {
                const group = stations.slice(i * 3, i * 3 + 3);
                return (
                  <Carousel.Item key={i}>
                    <motion.div
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={{
                        visible: { transition: { staggerChildren: 0.15 } },
                      }}
                    >
                      {group.map((s) => (
                        <motion.div
                          key={s.id}
                          variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0 },
                          }}
                          whileHover={{ scale: 1 }}
                          className="bg-white rounded-xl shadow-md hover:shadow-xl transition cursor-pointer overflow-hidden"
                          onClick={() => setSelectedStation(s.id)}
                        >
                          <div className="relative">
                            <span className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                              {s.distance || "Gần bạn"}
                            </span>
                            <img
                              src={
                                s.imageUrl ||
                                "https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=800"
                              }
                              alt={s.name}
                              className="w-full h-[200px] object-cover"
                            />
                          </div>
                          <div className="p-5">
                            <div className="flex flex-col gap-5">
                              <div className="h-40">
                                <h3 className="font-bold text-gray-800 text-lg mb-2">
                                  {s.name}
                                </h3>
                                <p className="text-sm text-gray-600 mb-3 flex items-start gap-1">
                                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                  {s.location}
                                </p>
                                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                                  <span className="flex items-center gap-1">
                                    <Zap className="w-4 h-4" />
                                    {s.powerCapacity} kW
                                  </span>
                                </div>
                              </div>
                              <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate(`/station/${s.id}`)}
                                className="w-full bg-green-600 text-white py-2.5 rounded-md hover:bg-green-700 transition font-medium"
                              >
                                Đặt chỗ ngay
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </Carousel.Item>
                );
              }
            )}
          </Carousel>
        )}
      </motion.section>
    </motion.div>
  );
};

export default HomePage;
