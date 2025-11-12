import { Modal, Descriptions, Tag, Spin, Empty } from 'antd';
import { useAppDispatch, useAppSelector } from "../../../store/index.js";
import { useEffect } from "react";
import {
    fetchStationRevenue,
    selectStationRevenue,
    selectStationsStatus,
    selectStationsError
} from "../../../store/slices/chargingStationSlice.js";

const StationRevenueModal = ({ open, onCancel, station }) => {
    const dispatch = useAppDispatch();
    const revenue = useAppSelector(selectStationRevenue);
    const status = useAppSelector(selectStationsStatus);
    const error = useAppSelector(selectStationsError);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    useEffect(() => {
        if (open && station?.id) {
            dispatch(fetchStationRevenue(station.id));
        }
    }, [open, station]);

    const renderContent = () => {
        if (status === 'loading') {
            return (
                <div className="flex justify-center items-center p-8">
                    <Spin size="large" />
                </div>
            );
        }

        if (error || !revenue) {
            return (
                <Empty
                    description={error || 'Không tìm thấy dữ liệu doanh thu'}
                    className="py-8"
                />
            );
        }

        return (
            <Descriptions bordered column={1}>
                <Descriptions.Item label="Tên trạm">
                    {station?.name}
                </Descriptions.Item>
                <Descriptions.Item label="Doanh thu từ phiên sạc">
                    <Tag color="blue" style={{ fontSize: '16px' }}>
                        {formatCurrency(revenue?.totalSession || 0)}
                    </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Doanh thu từ đặt chỗ">
                    <Tag color="blue" style={{ fontSize: '16px' }}>
                        {formatCurrency(revenue?.totalBooking || 0)}
                    </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Tổng doanh thu">
                    <Tag color="red" style={{ fontSize: '16px', fontWeight: 'bold' }}>
                        {formatCurrency((revenue?.totalSession || 0) + (revenue?.totalBooking || 0))}
                    </Tag>
                </Descriptions.Item>
            </Descriptions>
        );
    };

    return (
        <Modal
            title={`Doanh thu trạm sạc #${station?.id}`}
            open={open}
            onCancel={onCancel}
            footer={null}
            width={600}
            destroyOnHidden
        >
            {renderContent()}
        </Modal>
    );
};

export default StationRevenueModal;