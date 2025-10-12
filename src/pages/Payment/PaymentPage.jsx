import BillDetails from "../../components/Payment/BillDetails.jsx";
import PaymentMethods from "../../components/Payment/PaymentMethods.jsx";

const PaymentPage = () => {
    return (
        <div id="payment-page" className="flex flex-col gap-6 p-6" style={{background: "#F0F2EB"}}>
           <BillDetails/>
           <PaymentMethods/>
        </div>
    );
};

export default PaymentPage;
