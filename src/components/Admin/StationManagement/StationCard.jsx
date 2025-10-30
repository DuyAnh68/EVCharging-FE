import "./style.css";
import {useState} from "react";
import {Card, Button, Tag, Collapse} from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    EnvironmentOutlined,
    DownOutlined,
    UpOutlined
} from "@ant-design/icons";
import StationFormModal from "./StationFormModal.jsx";

const statusColors = {
    "Hoạt động": "bg-green-100 text-green-700",
    "Không hoạt động": "bg-red-100 text-red-600",
    "Bảo trì": "bg-yellow-100 text-yellow-700",
};

const StationCard = ({
                         station,
                         onEditClick,
                         onDeleteClick,
                         onAddChargerClick,
                         onEditChargerClick,
                         onDeleteChargerClick
                     }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <Card className="shadow-sm rounded-xl border border-gray-200">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-lg font-semibold">{station.name}</h2>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <EnvironmentOutlined/> {station.address}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <Tag color="green">{station.chargers.length} cổng sạc</Tag>
                        <Tag color="blue">{station.type}</Tag>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button
                        icon={<EditOutlined/>}
                        onClick={(e) => {
                            e.stopPropagation();
                            onEditClick?.(station);
                        }}/>
                    <Button
                        danger
                        icon={<DeleteOutlined/>}
                        onClick={(e) => {
                            e.stopPropagation();
                            onDeleteClick?.(station);
                        }}/>
                </div>
            </div>

            {/* Collapse Section */}
            <Collapse
                className="mt-4"
                bordered={false}
                expandIconPosition="end"
                items={[{
                    key: '1',
                    label: (
                        <div className="flex items-center justify-center gap-2">
                            {expanded ? <UpOutlined/> : <DownOutlined/>}
                            {expanded ? 'Ẩn cổng sạc' : 'Xem cổng sạc'}
                        </div>
                    ),
                    children: (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {station.chargers?.length === 0 && (
                                <div className="col-span-3 flex items-center justify-center">
                                    <p className="text-gray-500">Không có cổng sạc</p>
                                </div>
                            )}
                            {station.chargers?.length > 0 && station.chargers?.map((charger) => (
                                <Card key={charger.id} className="border border-gray-200 rounded-lg">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-semibold text-green-700">{charger.name}</h3>
                                        <div className="flex gap-2">
                                            <Button
                                                size="small"
                                                icon={<EditOutlined />}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onEditChargerClick?.(station, charger);
                                                }}
                                            />
                                            <Button
                                                size="small"
                                                danger
                                                icon={<DeleteOutlined />}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onDeleteChargerClick?.(station, charger);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600">Công suất: {charger.power}</p>
                                    <p className="text-sm text-gray-600 mb-2">Loại: {charger.type}</p>
                                    <div
                                        className={`text-center py-1 rounded-full text-sm ${statusColors[charger.status]}`}>
                                        {charger.status}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ),
                    showArrow: false,
                    extra: (
                        <Button
                            type="primary"
                            className="w-full mt-2"
                            icon={<PlusOutlined />}
                            onClick={(e) => {
                                e.stopPropagation();
                                onAddChargerClick?.(station);
                            }}
                        >
                            Thêm cổng sạc
                        </Button>
                    )
                }]}
                onChange={() => setExpanded(!expanded)}
                activeKey={expanded ? ['1'] : []}
            />
        </Card>
    );
};

export default StationCard;
