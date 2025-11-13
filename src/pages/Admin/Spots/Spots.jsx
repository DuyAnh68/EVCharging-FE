import React, { useEffect, useState } from 'react';
import {
    Table,
    Button,
    Input,
    Space,
    Tag,
    Tooltip,
    Typography
} from 'antd';
import {
    PlusOutlined,
    SearchOutlined,
    EditOutlined,
    DeleteOutlined,
    ReloadOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import SpotFormModal from '../../../components/Admin/SpotManagement/SpotFormModal';
import {
    fetchSpots,
    createSpot,
    updateSpot,
    deleteSpot,
    selectAllSpots,
    selectSpotsStatus,
} from '../../../store/slices/chargingSpotSlice';
import ConfirmModal from "../../../components/Modal/ConfirmModal.jsx";

const { Text, Title } = Typography;

const Spots = () => {
    const dispatch = useDispatch();
    const spots = useSelector(selectAllSpots);
    const status = useSelector(selectSpotsStatus);
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentSpot, setCurrentSpot] = useState(null);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [spotToDelete, setSpotToDelete] = useState(null);

    // Fetch spots on component mount
    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch]);

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const handleRefresh = () => {
        dispatch(fetchSpots());
    };

    const handleEdit = (spot) => {
        setCurrentSpot(spot);
        setIsModalVisible(true);
    };

    const handleDeleteClick = (id) => {
        setSpotToDelete(id);
        setDeleteConfirmOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!spotToDelete) return;

        try {
            await dispatch(deleteSpot(spotToDelete)).unwrap();
        } catch (err) {
            console.error('Xóa cổng sạc thất bại:', err);
        } finally {
            setDeleteConfirmOpen(false);
            setSpotToDelete(null);
        }
    };

    const handleSuccess = async (spotData) => {
        try {
            console.log(spotData);
            if (spotData.id) {
                await dispatch(updateSpot(spotData)).unwrap();
            } else {
                await dispatch(createSpot({stationId: spotData?.station?.id, spotData})).unwrap();
            }
            setIsModalVisible(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const filteredSpots = spots.filter(spot =>
        spot.spotName?.toLowerCase().includes(searchText.toLowerCase()) ||
        spot.station?.name?.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        {
            title: 'Tên cổng',
            dataIndex: 'spotName',
            key: 'spotName',
            render: (text) => <Text>{text}</Text>,
            sorter: (a, b) => a.spotName.localeCompare(b.spotName),
        },
        {
            title: 'Trạm sạc',
            dataIndex: ['station', 'name'],
            key: 'station',
            render: (_, record) => (
                <div>
                    <div>{record.station?.name}</div>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                        {record.station?.location}
                    </Text>
                </div>
            ),
        },
        {
            title: 'Công suất',
            dataIndex: 'powerOutput',
            key: 'powerOutput',
            render: (power) => `${power} kW`,
            sorter: (a, b) => a.powerOutput - b.powerOutput,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                const statusMap = {
                    'AVAILABLE': { text: 'Sẵn sàng', color: 'green' },
                    'MAINTENANCE': { text: 'Bảo trì', color: 'orange' },
                    'OCCUPIED': { text: 'Không khả dụng', color: 'default' },
                };
                const statusInfo = statusMap[status] || { text: status, color: 'default' };
                return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
            },
            filters: [
                { text: 'Sẵn sàng', value: 'AVAILABLE' },
                { text: 'Bảo trì', value: 'MAINTENANCE' },
                { text: 'Không khả dụng', value: 'UNAVAILABLE' },
            ],
            onFilter: (value, record) => record.status === value,
        },
        {
            title: 'Loại',
            dataIndex: 'spotType',
            key: 'spotType',
        },
        {
            title: 'Thao tác',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Chỉnh sửa">
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() => handleEdit(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleDeleteClick(record.id)}
                            disabled={record.status === 'IN_USE'}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <Title level={2} className="mb-0 text-gray-800">Quản lý cổng sạc</Title>
            </div>

            <div className="bg-white p-6 pb-0 rounded-lg shadow">
                <div className="mb-4 flex justify-between items-center">
                    <Input
                        placeholder="Tìm kiếm theo tên cổng hoặc trạm sạc..."
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ width: 300 }}
                        allowClear
                    />
                    <Space>
                        <Button
                            icon={<ReloadOutlined />}
                            onClick={handleRefresh}
                            loading={status === 'loading'}
                        >
                            Làm mới
                        </Button>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => {
                                setCurrentSpot(null);
                                setIsModalVisible(true);
                            }}
                        >
                            Thêm mới
                        </Button>
                    </Space>
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredSpots}
                    rowKey="id"
                    loading={status === 'loading'}
                    pagination={{
                        showSizeChanger: true,
                        showTotal: (total) => `Tổng ${total} cổng sạc`,
                        pageSizeOptions: ['10', '20', '50', '100'],
                        defaultPageSize: 10
                    }}
                    scroll={{ x: 'max-content' }}
                />
            </div>

            <SpotFormModal
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    setCurrentSpot(null);
                }}
                onSuccess={handleSuccess}
                initialValues={currentSpot}
                loading={status === 'loading'}
            />

            <ConfirmModal
                open={deleteConfirmOpen}
                onCancel={() => {
                    setDeleteConfirmOpen(false);
                    setSpotToDelete(null);
                }}
                onConfirm={handleDeleteConfirm}
                title="Xác nhận xóa"
                content="Bạn có chắc chắn muốn xóa cổng sạc này?"
                okText="Xóa"
                cancelText="Hủy"
                okType="danger"
            />
        </div>
    );
};

export default Spots;