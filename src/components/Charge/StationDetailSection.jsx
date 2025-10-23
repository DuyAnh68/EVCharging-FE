const  StationDetailSection = () => {
    return (
        <div className="station-detail-section card">
            <div className="flex flex-col gap-2">
                <div className="header">Thông tin trạm sạc</div>
                <div>Sau khi quét - hiển thị trạm sạc, tốc độ và tình trạng kết nối</div>
            </div>
            <div className="grid grid-cols-2">
                <div>
                    <div className="text-label">Trạm số</div>
                    <div>___</div>
                </div>
                <div>
                    <div className="text-label">Giá (đ/kWh)</div>
                    <div>___</div>
                </div>
            </div>
            <div className="grid grid-cols-2">
                <div>
                    <div className="text-label">Tình trạng kết nối</div>
                    <div>___</div>
                </div>
                <div>
                    <div className="text-label">Tốc độ sạc</div>
                    <div>___</div>
                </div>
            </div>
        </div>
    );
};

export default StationDetailSection;