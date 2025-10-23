import "./style.css";
import {useNavigate} from "react-router-dom";
const PaymentSection = () => {
    const navigate = useNavigate();
    return (
        <div className="payment-section card">
            <div className="flex flex-col gap-2">
                <div className="header">Tổng quan thanh toán</div>
                <div>Tính toán tiền theo kWh và thời gian</div>
            </div>

            <div className="flex flex-col gap-2">
                <div>Dung lượng pin giả định</div>
                <strong>75 kWh</strong>
            </div>

            <div className="flex flex-col gap-2">
                <div>Kết quả ước tính</div>
                <div className="grid grid-cols-2">
                    <div>
                        <div>Đã sạc</div>
                        <strong>0 kWh</strong>
                    </div>

                    <div>
                        <div>Tổng tiền</div>
                        <strong>0 VND</strong>
                    </div>
                </div>
            </div>

            <button className="btn" onClick={() => navigate("/payment")}>Thanh toán</button>
        </div>
    );
};

export default PaymentSection;