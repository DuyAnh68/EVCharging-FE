import {Progress} from "antd";
import "./style.css";

const ChargingStatusSection = () => {
    return (
        <div className="charging-status-section card">
            <div className="grid grid-cols-3">
                <div className="col-span-1 charging-progress">
                    <Progress size={200} type="circle" percent={25} strokeColor={"rgba(20, 174, 92, 0.58)"}/>
                </div>
                <div className="col-span-2 charging-info">
                    <div className="charging-info-item">
                        <div>Charging Speed</div>
                        <strong>___ kW</strong>
                    </div>
                    <div className="charging-info-item">
                        <div>Battery</div>
                        <strong>0%</strong>
                    </div>
                    <div className="charging-info-item">
                        <div>Remaining Time</div>
                        <strong>___</strong>
                    </div>
                    <div className="charging-info-item">
                        <div>Status</div>
                        <strong>Not Charging</strong>
                    </div>
                    <div className="flex flex-row gap-2">
                        <button disabled className="btn">Pause</button>
                        <button disabled className="btn">Stop</button>
                    </div>
                </div>
            </div>

            <div className="power-info">
                <div>Power charging details</div>
                <table className="w-full">
                    <thead>
                    <tr>
                        <th>Charged (kWh)</th>
                        <th>Price (VND)</th>
                        <th>Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td colSpan={3} className="text-center">No transaction</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ChargingStatusSection;