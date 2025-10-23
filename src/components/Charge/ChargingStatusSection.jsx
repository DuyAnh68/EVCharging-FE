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
                        <div>Tốc độ sạc</div>
                        <strong>___ kW</strong>
                    </div>
                    <div className="charging-info-item">
                        <div>Mức pin</div>
                        <strong>0%</strong>
                    </div>
                    <div className="charging-info-item">
                        <div>Thời gian còn</div>
                        <strong>___</strong>
                    </div>
                    <div className="charging-info-item">
                        <div>Trạng thái</div>
                        <strong>Chưa sạc</strong>
                    </div>
                    <div className="flex flex-row gap-2">
                        <button disabled className="btn">Tạm dừng</button>
                        <button disabled className="btn">Ngắt</button>
                    </div>
                </div>
            </div>

            <div className="power-info">
                <div>Chi tiết điện năng</div>
                <table className="w-full">
                    <thead>
                    <tr>
                        <th>Đã sạc (kWh)</th>
                        <th>Giá (đ)</th>
                        <th>Thời gian</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td colSpan={3} className="text-center">Chưa có giao dịch </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ChargingStatusSection;