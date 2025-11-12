import React, { useEffect, useState } from "react";
import {Table, Button, Input, Typography, Tag} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined, DollarOutlined  } from "@ant-design/icons";
import StationFormModal from "../../../components/Admin/StationManagement/StationFormModal";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  selectAllStations,
  fetchStations,
  createStation,
  updateStation,
  deleteStation,
  selectStationsStatus,
  selectStationsError
} from "../../../store/slices/chargingStationSlice.js";
import StationRevenueModal from "../../../components/Admin/StationManagement/StationRevenueModal.jsx";

const { Title } = Typography;

const Stations = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editingStation, setEditingStation] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [revenueModalVisible, setRevenueModalVisible] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  
  const dispatch = useAppDispatch();
  const stations = useAppSelector(selectAllStations);
  const status = useAppSelector(selectStationsStatus);

  useEffect(() => {
    dispatch(fetchStations());
  }, [dispatch]);

  const handleOpenAddModal = () => {
    setModalMode("add");
    setEditingStation(null);
    setModalOpen(true);
  };

  const handleSubmit = async (values) => {
    try {
      if (modalMode === "add") {
        await dispatch(createStation(values)).unwrap();
      } else {
        await dispatch(updateStation(values)).unwrap();
      }
    } catch (error) {
      console.error(error || "Đã xảy ra lỗi");
    } finally {
      setModalOpen(false);
    }
  };

  const handleEdit = (station) => {
    setModalMode("edit");
    setEditingStation(station);
    setModalOpen(true);
  };

  const handleDelete = (station) => {
    setEditingStation(station);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteStation(editingStation.id)).unwrap();
      setConfirmOpen(false);
    } catch (error) {
      console.error(error || "Đã xảy ra lỗi khi xóa trạm sạc");
    }
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleViewRevenue = (station) => {
    setSelectedStation(station);
    setRevenueModalVisible(true);
  };

  const columns = [
    {
      title: "Tên trạm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Công suất tối đa",
      dataIndex: "powerCapacity",
      key: "powerCapacity",
      render: (power) => `${power} kW`,
    },
    {
      title: "Giá mỗi kWh",
      dataIndex: "pricePerKwh",
      key: "pricePerKwh",
      render: (price) => `${price?.toLocaleString()} VND`,
    },
    {
      title: "Số cổng sạc",
      dataIndex: "totalSpots",
      key: "totalSpots",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "AVAILABLE" ? "green" : "red"}>
          {status === "AVAILABLE" ? "Hoạt động" : "Bảo trì"}
        </Tag>
      ),
    },
    {
      key: "actions",
      render: (_, record) => (
        <div className="flex">
          <Button
              title="Xem doanh thu"
              type="text"
              icon={<DollarOutlined />}
              onClick={() => handleViewRevenue(record)}
          >
          </Button>
          <Button
            type="text"
            onClick={() => handleEdit(record)}
            icon={<EditOutlined />}
            title="Chỉnh sửa"
          />
          <Button
            type="text"
            danger 
            onClick={() => handleDelete(record)}
            icon={<DeleteOutlined />}
            title="Xóa"
          />
        </div>
      ),
    },
  ];

  const filteredStations = stations?.filter((station) => {
    if (!station) return false;
    return (
      station.name?.toLowerCase().includes(search.toLowerCase()) ||
      station.location?.toLowerCase().includes(search.toLowerCase()) ||
      station.status?.toLowerCase().includes(search.toLowerCase())
    );
  });

  const pagination = {
    current: page,
    pageSize: pageSize,
    total: filteredStations?.length || 0,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "50", "100"],
    showTotal: (total) => `Tổng ${total} trạm sạc`,
    onChange: (page, pageSize) => {
      setPage(page);
      setPageSize(pageSize);
    },
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Title level={2} className="mb-0 text-gray-800">Quản lý trạm sạc</Title>
      </div>

      <div className="bg-white p-6 pb-0 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <Input
            placeholder="Tìm kiếm trạm sạc..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            value={search}
            onChange={onSearchChange}
            allowClear
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleOpenAddModal}
            loading={status === 'loading'}
          >
            Thêm trạm sạc
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={filteredStations}
          rowKey="id"
          loading={status === 'loading'}
          pagination={pagination}
          scroll={{ x: true }}
        />
      </div>

      <StationFormModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        mode={modalMode}
        initialValues={editingStation}
        loading={status === 'loading'}
      />

      <ConfirmModal
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Xác nhận xóa"
        content={`Bạn có chắc chắn muốn xóa trạm sạc "${editingStation?.name}" không?`}
        okText="Xóa"
        cancelText="Hủy"
        confirmLoading={status === 'loading'}
      />

      <StationRevenueModal
          open={revenueModalVisible}
          onCancel={() => setRevenueModalVisible(false)}
          station={selectedStation}
      />
    </div>
  );
};

export default Stations;