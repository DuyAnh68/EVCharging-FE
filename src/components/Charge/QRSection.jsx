import "./style.css";

const QRSection = () => {
    return (
        <div className="qr-section card">
            <div className="header">Quét QR / Camera</div>
            <div>Mở camera và quét QR trên tạm sạc</div>
            <div className="qr-container">
                <span>Camera chưa kết nối</span>
                <span>(hoặc thử “Mô phỏng QR”)</span>
            </div>
            <div className="flex flex-row gap-2 justify-center">
                <button disabled className="btn">Mở camera</button>
                <button disabled className="btn">Mô phỏng QR</button>
            </div>
        </div>
    );
};

export default QRSection;