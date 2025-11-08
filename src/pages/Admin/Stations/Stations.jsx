import React, {useState} from "react";
import {Table, Button, Input, Pagination, Tag} from "antd";
import {DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import {mockStations} from "../../../data/mockStations.js";
import StationFormModal from "../../../components/Admin/StationManagement/StationFormModal.jsx";
import ConfirmModal from "../../../components/Admin/StationManagement/ConfirmModal.jsx";

const Stations = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editingStation, setEditingStation] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleOpenAddModal = () => {
    setModalMode("add");
    setEditingStation(null);
    setModalOpen(true);
  };

  const handleSubmit = (values) => {
    console.log("Submitted:", values);
    setModalOpen(false);
  };

  const handleEdit = (station) => {
    setModalMode("edit");
    setEditingStation(station);
    setModalOpen(true);
  };

  const handleDelete = (station) => {
    setSelectedStation(station);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    console.log("Deleted station:", selectedStation);
    setDeleteLoading(true);
    setConfirmOpen(false);
    setSelectedStation(null);
    setDeleteLoading(false);
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const columns = [
    {
      title: "Tên trạm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mã trạm",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Địa chỉ",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (type) =>
          type === "AC" ? (
              <Tag color="orange">AC (Sạc chậm)</Tag>
          ) : (
              <Tag color="blue">DC (Sạc nhanh)</Tag>
          ),
    },
    {
      title: "Số lượng cổng sạc",
      dataIndex: "spots",
      key: "spots",
      render: (spots) => <span>{spots.length}</span>,
    },
    {
      key: "actions",
      render: (_, record) => (
          <div className="flex">
            <Button type="link" onClick={() => handleEdit(record)}><EditOutlined/></Button>
            <Button type="link" danger onClick={() => handleDelete(record)}>
              <DeleteOutlined/>
            </Button>
          </div>
      ),
    },
  ];

  const filteredStations = mockStations.filter((station) => {
    return station.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Quản lý trạm sạc</h1>
        </div>


        {/* Search */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <Input
              allowClear
              prefix={<SearchOutlined />}
              placeholder="Tìm kiếm..."
              value={search}
              onChange={onSearchChange}
              className="max-w-xs"
          />
          <Button type="primary" onClick={handleOpenAddModal} icon={<PlusOutlined />}>Thêm trạm sạc</Button>
        </div>

        {/* Table */}
        <Table
            bordered
            rowKey="id"
            columns={columns}
            dataSource={filteredStations.slice((page - 1) * pageSize, page * pageSize)}
            pagination={false}
        />

        {/* Pagination */}
        <div className="flex justify-end mt-4 items-center">
          <div className="text-sm text-gray-600 flex items-center px-3">Tổng {filteredStations.length} trạm sạc</div>
          <Pagination
              current={page}
              pageSize={pageSize}
              onChange={(p) => setPage(p)}
              onShowSizeChange={(current, size) => {
                setPageSize(size);
                setPage(1);
              }}
              total={filteredStations.length}
              showSizeChanger
          />
        </div>

        {/* Station Form Modal */}
        <StationFormModal
            open={modalOpen}
            mode={modalMode}
            initialValues={editingStation}
            onCancel={() => setModalOpen(false)}
            onSubmit={handleSubmit}
        />

        <ConfirmModal
            open={confirmOpen}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={confirmDelete}
            loading={deleteLoading}
            title="Xóa trạm?"
            message={`Bạn chắc chắn muốn xóa trạm "${selectedStation?.name}" không?`}
            okText="Xóa"
            cancelText="Hủy"
        />
      </div>
  );
};

export default Stations;