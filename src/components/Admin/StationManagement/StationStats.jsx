const StationStats = ({ stations }) => {
    const totalStations = stations.length;
    const totalChargers = stations.reduce((sum, s) => sum + s.chargers.length, 0);
    const activeChargers = stations
        .flatMap((s) => s.chargers)
        .filter((c) => c.status === "Hoạt động").length;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white shadow-sm rounded-xl p-4">
                <p className="text-blue-600 font-semibold">Tổng Trạm Sạc</p>
                <h2 className="text-2xl font-bold text-blue-700 mt-2">{totalStations}</h2>
            </div>

            <div className="bg-white shadow-sm rounded-xl p-4">
                <p className="text-green-600 font-semibold">Tổng Cổng Sạc</p>
                <h2 className="text-2xl font-bold text-green-700 mt-2">{totalChargers}</h2>
            </div>

            <div className="bg-white shadow-sm rounded-xl p-4">
                <p className="text-yellow-700 font-semibold">Cổng Hoạt Động</p>
                <h2 className="text-2xl font-bold text-yellow-800 mt-2">{activeChargers}</h2>
            </div>
        </div>
    );
};

export default StationStats;
