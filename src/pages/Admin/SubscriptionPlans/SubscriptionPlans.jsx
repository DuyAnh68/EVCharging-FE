import React, {useEffect, useState} from 'react';
import {Table, Button, Input, Typography, Space, Modal, Form, InputNumber, Tag} from 'antd';
import {
    PlusOutlined,
    SearchOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {
    fetchSubscriptionPlans,
    createSubscriptionPlan,
    updateSubscriptionPlan,
    deleteSubscriptionPlan,
    selectAllSubscriptionPlans,
    selectSubscriptionPlansStatus,
} from '../../../store/slices/subscriptionPlanSlice';
import ConfirmModal from "../../../components/Modal/ConfirmModal.jsx";

const {Title, Text} = Typography;
const {TextArea} = Input;

const SubscriptionPlans = () => {
    const dispatch = useDispatch();
    const plans = useSelector(selectAllSubscriptionPlans);
    const status = useSelector(selectSubscriptionPlansStatus);
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [planToDelete, setPlanToDelete] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(fetchSubscriptionPlans());
    }, [dispatch]);

    const handleSearch = (value) => {
        setSearchText(value.toLowerCase());
        setPage(1);
    };

    const filteredPlans = plans.filter(plan =>
        plan.name.toLowerCase().includes(searchText)
    );

    const handleAdd = () => {
        setEditingPlan(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (plan) => {
        setEditingPlan(plan);
        form.setFieldsValue({
            name: plan.name,
            price: plan.price,
            discount: plan.discount,
            description: plan.description.join('\n')
        });
        setIsModalVisible(true);
    };

    const handleDelete = (plan) => {
        setPlanToDelete(plan);
        setConfirmModalVisible(true);
    };

    const handleConfirmDelete = () => {
        if (planToDelete) {
            dispatch(deleteSubscriptionPlan(planToDelete.id));
            setConfirmModalVisible(false);
            setPlanToDelete(null);
        }
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const planData = {
                ...values,
                description: values.description.split('\n').filter(item => item.trim() !== '')
            };

            if (editingPlan) {
                await dispatch(updateSubscriptionPlan({id: editingPlan.id, ...planData})).unwrap();
            } else {
                await dispatch(createSubscriptionPlan(planData)).unwrap();
            }
            setIsModalVisible(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const columns = [
        {
            title: 'Tên gói',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Giá (VND)',
            dataIndex: 'price',
            key: 'price',
            render: (price) => new Intl.NumberFormat('vi-VN').format(price),
        },
        {
            title: 'Giảm giá (%)',
            dataIndex: 'discount',
            key: 'discount',
            render: (discount) => `${discount}%`,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            render: (description) => (
                <div style={{maxHeight: '100px', overflowY: 'auto'}}>
                    {description.map((item, index) => (
                        <div key={index}>• {item}</div>
                    ))}
                </div>
            ),
        },
        {
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="text"
                        icon={<EditOutlined/>}
                        onClick={() => handleEdit(record)}
                    />
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined/>}
                        onClick={() => handleDelete(record)}
                    />
                </Space>
            ),
        },
    ];

    const pagination = {
        current: page,
        pageSize: pageSize,
        total: filteredPlans?.length || 0,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'],
        showTotal: (total) => `Tổng ${total} gói đăng ký`,
        onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
        },
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <Title level={2} className="mb-0 text-gray-800">Quản lý gói đăng ký</Title>
            </div>

            <div className="bg-white p-6 pb-0 rounded-lg shadow">
                <div className="flex justify-between items-center mb-6">
                    <Input
                        placeholder="Tìm kiếm gói đăng ký..."
                        prefix={<SearchOutlined/>}
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{width: 300}}
                    />
                    <Button
                        type="primary"
                        icon={<PlusOutlined/>}
                        onClick={handleAdd}
                        loading={status === 'loading'}
                    >
                        Thêm gói
                    </Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredPlans}
                    rowKey="id"
                    loading={status === 'loading'}
                    pagination={pagination}
                    scroll={{ x: 'max-content' }}
                />
            </div>

            <Modal
                title={editingPlan ? 'Chỉnh sửa gói đăng ký' : 'Thêm gói đăng ký mới'}
                open={isModalVisible}
                onOk={handleSubmit}
                onCancel={() => setIsModalVisible(false)}
                confirmLoading={status === 'loading'}
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Form.Item
                        name="name"
                        label="Tên gói"
                        rules={[{required: true, message: 'Vui lòng nhập tên gói'}]}
                    >
                        <Input placeholder="Nhập tên gói"/>
                    </Form.Item>

                    <div style={{display: 'flex', gap: '16px'}}>
                        <Form.Item
                            name="price"
                            label="Giá (VND)"
                            rules={[{required: true, message: 'Vui lòng nhập giá'}]}
                            style={{flex: 1}}
                        >
                            <InputNumber
                                style={{width: '100%'}}
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value) => value.replace(/\s?VND|(,*)/g, '')}
                                min={0}
                            />
                        </Form.Item>

                        <Form.Item
                            name="discount"
                            label="Giảm giá (%)"
                            rules={[{required: true, message: 'Vui lòng nhập phần trăm giảm giá'}]}
                            style={{width: '150px'}}
                        >
                            <InputNumber
                                style={{width: '100%'}}
                                min={0}
                                max={100}
                                formatter={(value) => `${value}%`}
                                parser={(value) => value.replace('%', '')}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="description"
                        label="Mô tả (mỗi dòng là một tính năng)"
                        rules={[{required: true, message: 'Vui lòng nhập mô tả'}]}
                    >
                        <TextArea
                            placeholder="Mỗi dòng là một tính năng của gói"
                            autoSize={{minRows: 4}}
                        />
                    </Form.Item>
                </Form>
            </Modal>

            <ConfirmModal
                open={confirmModalVisible}
                onConfirm={handleConfirmDelete}
                onCancel={() => {
                    setConfirmModalVisible(false);
                    setPlanToDelete(null);
                }}
                title="Xác nhận xóa"
                message={`Bạn có chắc chắn muốn xóa gói "${planToDelete?.name}" không?`}
            />
        </div>
    );
};

export default SubscriptionPlans;
