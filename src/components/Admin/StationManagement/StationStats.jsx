import {mockStations} from "../../../data/mockStations.js";

const StationStats = () => {
    const totalStations = mockStations.length;
    const totalChargers = mockStations.reduce((sum, s) => sum + s.spots.length, 0);
    const activeChargers = mockStations
        .flatMap((s) => s.spots)
        .filter((c) => c.status === "Hoạt động").length;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white shadow-md rounded-xl p-4">
                <span className="text-blue-600 font-semibold text-xl">Tổng Trạm Sạc</span>
                <h2 className="text-2xl font-bold text-blue-700 mt-2">{totalStations}</h2>
            </div>

            <div className="bg-white shadow-md rounded-xl p-4">
                <span className="text-green-600 font-semibold text-xl">Tổng Cổng Sạc</span>
                <h2 className="text-2xl font-bold text-green-700 mt-2">{totalChargers}</h2>
            </div>

            <div className="bg-white shadow-md rounded-xl p-4">
                <span className="text-yellow-700 font-semibold text-xl">Cổng Hoạt Động</span>
                <h2 className="text-2xl font-bold text-yellow-800 mt-2">{activeChargers}</h2>
            </div>
        </div>
    );
};

export default StationStats;
