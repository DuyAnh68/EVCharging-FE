import "./style.css";

const BillDetails = () => {
    return (
        <div className="bill-details">
            <div className="title pb-2">Hóa đơn</div>
            <div className="card">
                <div className="flex flex-row justify-between">
                    <div>Trạm sạc</div>
                    <strong>EV Station - VinFast Plaza</strong>
                </div>
                <div className="flex flex-row justify-between">
                    <div>Xe</div>
                    <strong>VF3: 39A -12345</strong>
                </div>
                <div className="flex flex-row justify-between">
                    <div>Thời gian sạc</div>
                    <strong>14:30 - 15:15 (45 phút)</strong>
                </div>
                <div className="flex flex-row justify-between">
                    <div>Điện năng tiêu thụ</div>
                    <strong>4.500 VND/kWh</strong>
                </div>

                <div className="flex flex-row justify-between">
                    <div>Đơn giá</div>
                    <strong>18.2 kWh</strong>
                </div>

                <div className="line border-b"></div>

                <div className="flex flex-row justify-between">
                    <div>Tạm tính</div>
                    <strong>81,900 VND</strong>
                </div>
                <div className="flex flex-row justify-between">
                    <div>Phí dịch vụ</div>
                    <strong>5,000 VND</strong>
                </div>

                <div className="total flex flex-row justify-between">
                    <div>Tổng cộng</div>
                    <strong>86,900 VND</strong>
                </div>
            </div>
        </div>
    );
};

export default BillDetails;
