import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Space, Typography, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import VehicleFormModal from '../../../components/Admin/VehicleManagement/VehicleFormModal';
import ConfirmModal from '../../../components/Modal/ConfirmModal';
import {
  fetchVehicleModels,
  createVehicleModel,
  updateVehicleModel,
  deleteVehicleModel,
  selectAllVehicleModels,
  selectVehicleModelsStatus,
} from '../../../store/slices/vehicleModelSlice';

const { Title } = Typography;

const VehicleModels = () => {
  const dispatch = useDispatch();
  const models = useSelector(selectAllVehicleModels);
  const status = useSelector(selectVehicleModelsStatus);

  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentModel, setCurrentModel] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [modelToDelete, setModelToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchVehicleModels());
  }, [dispatch]);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleRefresh = () => {
    dispatch(fetchVehicleModels());
  };

  const handleEdit = (model) => {
    setCurrentModel(model);
    setIsModalVisible(true);
  };

  const handleDeleteClick = (id) => {
    setModelToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!modelToDelete) return;
    
    try {
      await dispatch(deleteVehicleModel(modelToDelete)).unwrap();
    } catch (err) {
      console.error('Xóa mẫu xe thất bại:', err);
    } finally {
      setDeleteConfirmOpen(false);
      setModelToDelete(null);
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (currentModel) {
        await dispatch(updateVehicleModel({ id: currentModel.id, ...values })).unwrap();
      } else {
        await dispatch(createVehicleModel(values)).unwrap();
      }
      setIsModalVisible(false);
      setCurrentModel(null);
    } catch (error) {
      console.error('Lỗi khi lưu mẫu xe:', error);
    }
  };

  const filteredModels = models?.filter(model =>
    model.brandName?.toLowerCase().includes(searchText.toLowerCase()) ||
    model.modelName?.toLowerCase().includes(searchText.toLowerCase()) ||
    model.connector?.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Hãng xe',
      dataIndex: 'brandName',
      key: 'brandName',
      sorter: (a, b) => a.brandName.localeCompare(b.brandName),
    },
    {
      title: 'Mẫu xe',
      dataIndex: 'modelName',
      key: 'modelName',
      sorter: (a, b) => a.modelName.localeCompare(b.modelName),
    },
    {
      title: 'Chuẩn sạc',
      dataIndex: 'connector',
      key: 'connector',
    },
    {
      title: 'Dung lượng pin (kWh)',
      dataIndex: 'batteryCapacity',
      key: 'batteryCapacity',
      render: (capacity) => capacity ? `${capacity} kWh` : '-',
      sorter: (a, b) => a.batteryCapacity - b.batteryCapacity,
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
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="mb-0 text-gray-800">Quản lý mẫu xe</Title>
      </div>

      <div className="bg-white p-6 pb-0 rounded-lg shadow">
        <div className="flex justify-between mb-4">
          <Input
              placeholder="Tìm kiếm..."
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
                setCurrentModel(null);
                setIsModalVisible(true);
              }}
            >
              Thêm mới
            </Button>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={filteredModels}
          rowKey="id"
          loading={status === 'loading'}
          pagination={{
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} mẫu xe`,
            pageSizeOptions: ['10', '20', '50', '100'],
            defaultPageSize: 10,
          }}
          scroll={{ x: 'max-content' }}
        />
      </div>

      <VehicleFormModal
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setCurrentModel(null);
        }}
        onSubmit={handleSubmit}
        mode={currentModel ? 'edit' : 'add'}
        initialValues={currentModel}
        loading={status === 'loading'}
      />

      <ConfirmModal
        open={deleteConfirmOpen}
        onCancel={() => {
          setDeleteConfirmOpen(false);
          setModelToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Xác nhận xóa"
        content="Bạn có chắc chắn muốn xóa mẫu xe này?"
        okText="Xóa"
        cancelText="Hủy"
        okType="danger"
      />
    </div>
  );
};

export default VehicleModels;