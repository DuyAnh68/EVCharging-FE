import "./style.css";
import {useNavigate} from "react-router-dom";
const PaymentSection = () => {
    const navigate = useNavigate();
    return (
        <div className="payment-section card">
            <div className="flex flex-col gap-2">
                <div className="header">Payment information</div>
                <div>Calculate the cost based on kWh and time.</div>
            </div>

            <div className="flex flex-col gap-2">
                <div>Battery capacity</div>
                <strong>75 kWh</strong>
            </div>

            <div className="flex flex-col gap-2">
                <div>Result</div>
                <div className="grid grid-cols-2">
                    <div>
                        <div>Charged</div>
                        <strong>0 kWh</strong>
                    </div>

                    <div>
                        <div>Total cost</div>
                        <strong>0 VND</strong>
                    </div>
                </div>
            </div>

            <button className="btn" onClick={() => navigate("/payment")}>Pay Now</button>
        </div>
    );
};

export default PaymentSection;