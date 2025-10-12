import QRSection from "../../components/Charge/QRSection.jsx";
import StationDetailSection from "../../components/Charge/StationDetailSection.jsx";
import ChargingStatusSection from "../../components/Charge/ChargingStatusSection.jsx";
import PaymentSection from "../../components/Charge/PaymentSection.jsx";

const ChargePage = () => {
    return (
        <div id="charge-page" className="flex flex-col gap-4 p-4" style={{background: "#F0F2EB"}}>
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                    <QRSection/>
                </div>
                <div className="col-span-2 flex">
                    <StationDetailSection/>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                    <ChargingStatusSection/>
                </div>
                <div className="col-span-1">
                    <PaymentSection/>
                </div>
            </div>
        </div>
    );
};

export default ChargePage;