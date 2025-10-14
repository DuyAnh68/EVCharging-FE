import "./style.css";

const BillDetails = () => {
    return (
        <div className="bill-details">
            <div className="title pb-2">Your Bill</div>
            <div className="card">
                <div className="flex flex-row justify-between">
                    <div>Charging Station</div>
                    <strong>EV Station - VinFast Plaza</strong>
                </div>
                <div className="flex flex-row justify-between">
                    <div>Vehicle</div>
                    <strong>VF3: 39A -12345</strong>
                </div>
                <div className="flex flex-row justify-between">
                    <div>Charging Time</div>
                    <strong>14:30 - 15:15 (45 minutes)</strong>
                </div>
                <div className="flex flex-row justify-between">
                    <div>Energy consumption</div>
                    <strong>4.500 VND/kWh</strong>
                </div>

                <div className="flex flex-row justify-between">
                    <div>Unit price</div>
                    <strong>18.2 kWh</strong>
                </div>

                <div className="line border-b"></div>

                <div className="flex flex-row justify-between">
                    <div>Subtotal</div>
                    <strong>81,900 VND</strong>
                </div>
                <div className="flex flex-row justify-between">
                    <div>Service fee</div>
                    <strong>5,000 VND</strong>
                </div>

                <div className="total flex flex-row justify-between">
                    <div>Total</div>
                    <strong>86,900 VND</strong>
                </div>
            </div>
        </div>
    );
};

export default BillDetails;
