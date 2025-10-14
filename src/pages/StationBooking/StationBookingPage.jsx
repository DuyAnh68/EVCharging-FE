import StationInfoSection from "../../components/StationBooking/StationInfoSection.jsx";
import StationDetailSection from "../../components/StationBooking/StationDetailSection.jsx";

const StationBookingPage = () => {
    return (
        <div id="station-booking-page" className="grid grid-cols-3 gap-4 p-4" style={{background: "#F0F2EB"}}>
            <StationInfoSection />
            <StationDetailSection />
        </div>
    );
};

export default StationBookingPage;
