import "./style.css";

const QRSection = () => {
    return (
        <div className="qr-section card">
            <div className="header">Scan QR</div>
            <div>Open camera and scan the QR code of station</div>
            <div className="qr-container">
                <span>Camera not connected</span>
                <span>(or try “QR Simulation”)</span>
            </div>
            <div className="flex flex-row gap-2 justify-center">
                <button disabled className="btn">Open camera</button>
                <button disabled className="btn">QR Simulation</button>
            </div>
        </div>
    );
};

export default QRSection;