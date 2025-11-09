import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Typography, Space, Modal, Form } from 'antd';
import {
    PlusOutlined,
    SearchOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchVehicleBrands,
    createVehicleBrand,
    updateVehicleBrand,
    deleteVehicleBrand,
    selectAllVehicleBrands,
    selectVehicleBrandsStatus,
} from '../../../store/slices/vehicleBrandSlice';
import ConfirmModal from "../../../components/Modal/ConfirmModal.jsx";

const { Title } = Typography;

const VehicleBrands = () => {
    const dispatch = useDispatch();
    const brands = useSelector(selectAllVehicleBrands);
    const status = useSelector(selectVehicleBrandsStatus);
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingBrand, setEditingBrand] = useState(null);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [brandToDelete, setBrandToDelete] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(fetchVehicleBrands());
    }, [dispatch]);

    const handleSearch = (value) => {
        setSearchText(value.toLowerCase());
    };

    const filteredBrands = brands.filter(brand =>
        brand.name.toLowerCase().includes(searchText)
    );

    const handleAdd = () => {
        setEditingBrand(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (brand) => {
        setEditingBrand(brand);
        form.setFieldsValue({
            name: brand.name
        });
        setIsModalVisible(true);
    };

    const handleDelete = (brand) => {
        setBrandToDelete(brand);
        setConfirmModalVisible(true);
    };

    const handleConfirmDelete = () => {
        if (brandToDelete) {
            dispatch(deleteVehicleBrand(brandToDelete.id));
            setConfirmModalVisible(false);
            setBrandToDelete(null);
        }
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            if (editingBrand) {
                await dispatch(updateVehicleBrand({ id: editingBrand.id, ...values })).unwrap();
            } else {
                await dispatch(createVehicleBrand(values)).unwrap();
            }
            setIsModalVisible(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const columns = [
        {
            title: 'Tên hãng xe',
            dataIndex: 'name',
            key: 'name',
        },
        {
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    />
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <Title level={2} className="mb-0 text-gray-800">Quản lý hãng xe</Title>
            </div>

            <div className="bg-white p-6 pb-0 rounded-lg shadow">
                <div className="flex justify-between mb-6">
                    <Input
                        placeholder="Tìm kiếm hãng xe..."
                        prefix={<SearchOutlined />}
                        style={{ width: 300 }}
                        value={searchText}
                        onChange={(e) => handleSearch(e.target.value)}
                        allowClear
                    />
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAdd}
                        loading={status === 'loading'}
                    >
                        Thêm hãng xe
                    </Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredBrands}
                    rowKey="id"
                    loading={status === 'loading'}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Tổng ${total} hãng xe`,
                    }}
                    scroll={{ x: 'max-content' }}
                />
            </div>

            <Modal
                title={editingBrand ? 'Chỉnh sửa hãng xe' : 'Thêm hãng xe mới'}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={handleSubmit}
                confirmLoading={status === 'loading'}
                okText={editingBrand ? 'Cập nhật' : 'Thêm mới'}
                cancelText="Hủy"
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        name: '',
                    }}
                >
                    <Form.Item
                        name="name"
                        label="Tên hãng xe"
                        rules={[
                            { required: true, message: 'Vui lòng nhập tên hãng xe' },
                            { max: 50, message: 'Tên hãng xe không được vượt quá 50 ký tự' }
                        ]}
                    >
                        <Input placeholder="Nhập tên hãng xe" />
                    </Form.Item>
                </Form>
            </Modal>

            <ConfirmModal
                open={confirmModalVisible}
                onCancel={() => setConfirmModalVisible(false)}
                onConfirm={handleConfirmDelete}
                title="Xác nhận xóa"
                content={`Bạn có chắc chắn muốn xóa hãng xe "${brandToDelete?.name}"?`}
                okText="Xóa"
                cancelText="Hủy"
                confirmLoading={status === 'loading'}
            />
        </div>
    );
};

export default VehicleBrands;