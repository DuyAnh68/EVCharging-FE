import { useNavigate } from "react-router-dom";
import useStation from "../../hooks/useStation";
import { motion } from "framer-motion";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const headingVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="container mx-auto p-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-2xl font-bold pb-10"
        variants={headingVariants}
      >
        Danh sách trạm sạc
      </motion.h1>

      <div className="space-y-4">
        {stations.map((station, index) => (
          <motion.div
            key={station.id}
            variants={itemVariants}
            whileHover={{
              transition: { duration: 0.2 },
            }}
            className="flex items-center border rounded-lg p-4 bg-white shadow-sm"
          >
            <motion.div className="w-24 h-24 mr-4" whileHover={{ scale: 1.1 }}>
              <img
                src={
                  station.image ||
                  "https://greencharge.vn/wp-content/uploads/2023/04/greencharge-38.jpg"
                }
                alt={station.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </motion.div>

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

            <motion.button
              onClick={() => navigate(`/station/${station.id}`)}
              disabled={station.status !== "AVAILABLE"}
              whileHover={{ scale: station.status === "AVAILABLE" ? 1.05 : 1 }}
              whileTap={{ scale: station.status === "AVAILABLE" ? 0.95 : 1 }}
              className={`px-4 py-2 rounded transition-colors ${
                station.status !== "AVAILABLE"
                  ? "!bg-gray-400 !text-white cursor-not-allowed"
                  : "!bg-[#0F9456] text-white hover:!bg-[#109857]"
              }`}
            >
              ĐẶT CHỖ
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Booking;
