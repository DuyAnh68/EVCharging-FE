import "./style.css";
import {StarIcon} from "../../assets/icons/index.jsx";

const PaymentMethods = () => {
    return (
        <div className='payment-methods card'>
            <div className="header">Payment Methods</div>
            <div className="card">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2 items-center">
                        <strong>Pay with subscription plan</strong>
                        <div className="benefit-tag"><StarIcon/> Save 15%</div>
                    </div>
                    <div>Use the registered Standard plan</div>
                </div>

                <button className="btn">Pay Now</button>
            </div>
            <div className="card">
                <div className="flex flex-col gap-2">
                    <strong>Pay with postpaid plan</strong>
                    <div>Use the Postpaid plan for payment</div>
                </div>

                <button className="btn">Pay Now</button>
            </div>
        </div>
    );
};

export default PaymentMethods;
