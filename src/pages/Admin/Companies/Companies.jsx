import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Typography, Space, Modal, Form, message } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, BankOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
  selectAllCompanies,
  selectCompaniesStatus,
} from '../../../store/slices/companySlice';
import ConfirmModal from '../../../components/Modal/ConfirmModal';

const { Title } = Typography;

const Companies = () => {
  const dispatch = useDispatch();
  const companies = useSelector(selectAllCompanies);
  const status = useSelector(selectCompaniesStatus);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
    setPage(1);
  };

  const filteredCompanies = companies.filter(company =>
    company.name?.toLowerCase().includes(searchText) ||
    company.address?.toLowerCase().includes(searchText) ||
    company.contactEmail?.toLowerCase().includes(searchText)
  );

  const handleAdd = () => {
    setEditingCompany(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    form.setFieldsValue({
      name: company.name,
      address: company.address,
      contactEmail: company.contactEmail
    });
    setIsModalVisible(true);
  };

  const handleDelete = (company) => {
    setCompanyToDelete(company);
    setConfirmModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (companyToDelete) {
      dispatch(deleteCompany(companyToDelete.id));
      setConfirmModalVisible(false);
      setCompanyToDelete(null);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingCompany) {
        await dispatch(updateCompany({ id: editingCompany.id, ...values })).unwrap();
        message.success('Cập nhật công ty thành công');
      } else {
        await dispatch(createCompany(values)).unwrap();
        message.success('Thêm công ty thành công');
      }
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error:', error);
      message.error(error.message || 'Đã xảy ra lỗi');
    }
  };

  const columns = [
    {
      title: 'Tên công ty',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Email liên hệ',
      dataIndex: 'contactEmail',
      key: 'contactEmail',
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

  const pagination = {
    current: page,
    pageSize: pageSize,
    total: filteredCompanies?.length || 0,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total) => `Tổng ${total} công ty`,
    onChange: (page, pageSize) => {
      setPage(page);
      setPageSize(pageSize);
    },
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Title level={2} className="mb-0 text-gray-800">Quản lý công ty</Title>
      </div>

      <div className="bg-white p-6 pb-0 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <Input
            placeholder="Tìm kiếm công ty..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            value={searchText}
            onChange={handleSearch}
            allowClear
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            loading={status === 'loading'}
          >
            Thêm công ty
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={filteredCompanies}
          rowKey="id"
          loading={status === 'loading'}
          pagination={pagination}
          scroll={{ x: 'max-content' }}
        />
      </div>

      <Modal
        title={editingCompany ? 'Chỉnh sửa công ty' : 'Thêm công ty mới'}
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
            label="Tên công ty"
            rules={[{ required: true, message: 'Vui lòng nhập tên công ty' }]}
          >
            <Input placeholder="Nhập tên công ty" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
          >
            <Input placeholder="Nhập địa chỉ công ty" />
          </Form.Item>

          <Form.Item
            name="contactEmail"
            label="Email liên hệ"
            rules={[
              { required: true, message: 'Vui lòng nhập email liên hệ' },
              { type: 'email', message: 'Email không hợp lệ' }
            ]}
          >
            <Input placeholder="Nhập email liên hệ" />
          </Form.Item>
        </Form>
      </Modal>

      <ConfirmModal
        open={confirmModalVisible}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setConfirmModalVisible(false);
          setCompanyToDelete(null);
        }}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa công ty "${companyToDelete?.name}" không?`}
      />
    </div>
  );
};

export default Companies;
