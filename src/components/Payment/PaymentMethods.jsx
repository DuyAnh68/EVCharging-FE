import "./style.css";
import {StarIcon} from "../../assets/icons/index.jsx";

const PaymentMethods = () => {
    return (
        <div className='payment-methods card'>
            <div className="header">Phương thức thanh toán</div>
            <div className="card">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2 items-center">
                        <strong>Thanh toán bằng gói thuê bao</strong>
                        <div className="benefit-tag"><StarIcon/> Tiết kiệm 15%</div>
                    </div>
                    <div>Sử dụng Gói tiêu chuẩn đã đăng ký</div>
                </div>

                <button className="btn">Thanh toán</button>
            </div>
            <div className="card">
                <div className="flex flex-col gap-2">
                    <strong>Thanh toán bằng gói trả sau</strong>
                    <div>Sử dụng gói trả sau để thanh toán</div>
                </div>

                <button className="btn">Thanh toán</button>
            </div>
        </div>
    );
};

export default PaymentMethods;
