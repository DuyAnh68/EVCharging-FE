const StationDetailSection = () => {
    return (
        <div className="station-detail-section card">
            <div className="flex flex-col gap-2">
                <div className="header">Station Detail Section</div>
                <div>After scanning — display the charging station, the charging speed, and the connection status.</div>
            </div>
            <div className="grid grid-cols-2">
                <div>
                    <div className="text-label">Port</div>
                    <div>___</div>
                </div>
                <div>
                    <div className="text-label">Price (VND/kWh)</div>
                    <div>___</div>
                </div>
            </div>
            <div className="grid grid-cols-2">
                <div>
                    <div className="text-label">Connection Status</div>
                    <div>___</div>
                </div>
                <div>
                    <div className="text-label">Charging Speed</div>
                    <div>___</div>
                </div>
            </div>
        </div>
    );
};

export default StationDetailSection;