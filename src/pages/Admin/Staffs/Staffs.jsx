import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Typography, Space, Modal, Form, Select, Tag } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchStaffs,
  createStaff,
  updateStaff,
  deleteStaff,
  selectAllStaffs,
  selectStaffsStatus,
} from '../../../store/slices/staffSlice';
import ConfirmModal from '../../../components/Modal/ConfirmModal';
import {fetchCompanies, selectAllCompanies} from '../../../store/slices/companySlice';

const { Title } = Typography;
const { Option } = Select;

const Staffs = () => {
  const dispatch = useDispatch();
  const staffs = useSelector(selectAllStaffs);
  const companies = useSelector(selectAllCompanies);
  const status = useSelector(selectStaffsStatus);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (companies?.length === 0) {
      dispatch(fetchCompanies());
    }
    dispatch(fetchStaffs());
  }, [dispatch]);

  console.log(companies);

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
    setPage(1);
  };

  const filteredStaffs = staffs.filter(staff =>
    staff.name?.toLowerCase().includes(searchText) ||
    staff.email?.toLowerCase().includes(searchText) ||
    staff.username?.toLowerCase().includes(searchText)
  );

  const handleAdd = () => {
    setEditingStaff(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (staff) => {
    if (staff?.roles?.includes('ADMIN')) {
      return;
    }
    setEditingStaff(staff);
    form.setFieldsValue({
      username: staff.username,
      email: staff.email,
      name: staff.name,
      role: staff.roles?.[0],
      companyId: staff.companyResponse?.id
    });
    setIsModalVisible(true);
  };

  const handleDelete = (staff) => {
    setStaffToDelete(staff);
    setConfirmModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (staffToDelete) {
      dispatch(deleteStaff(staffToDelete.id));
      setConfirmModalVisible(false);
      setStaffToDelete(null);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingStaff) {
        const updateData = { ...values };
        if (!updateData.password) {
          delete updateData.password;
        }
        await dispatch(updateStaff({ id: editingStaff.id, ...updateData })).unwrap();
      } else {
        if (!values.password) {
          return;
        }
        await dispatch(createStaff(values)).unwrap();
      }
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'ADMIN':
        return 'red';
      case 'COMPANY':
        return 'blue';
      case 'DRIVER':
        return 'green';
      case 'MEMBER':
        return 'orange';
      default:
        return 'gray';
    }
  };

  const columns = [
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Họ tên',
      dataIndex: 'name',
      key: 'name',
      render: (name) => name || 'Chưa cập nhật',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Vai trò',
      key: 'roles',
      render: (_, record) => (
        <Space size="small">
          {record?.roles?.map((role) => (
            <Tag color={getRoleColor(role)} key={role}>
              {role === 'ADMIN' ? 'Quản trị viên' :
               role === 'COMPANY' ? 'Công ty' :
               role === 'DRIVER' ? 'Tài xế' : 'Thành viên'}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Công ty',
      key: 'company',
      render: (_, record) => record?.companyResponse?.name || 'Không có',
    },
    {
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            disabled={record.roles?.includes('ADMIN')}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            disabled={record.roles?.includes('ADMIN')}
          />
        </Space>
      ),
    },
  ];

  const pagination = {
    current: page,
    pageSize: pageSize,
    total: filteredStaffs?.length || 0,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total) => `Tổng ${total} nhân viên`,
    onChange: (page, pageSize) => {
      setPage(page);
      setPageSize(pageSize);
    },
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Title level={2} className="mb-0 text-gray-800">Quản lý nhân viên</Title>
      </div>

      <div className="bg-white p-6 pb-0 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <Input
            placeholder="Tìm kiếm nhân viên..."
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
            Thêm nhân viên
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={filteredStaffs}
          rowKey="id"
          loading={status === 'loading'}
          pagination={pagination}
          scroll={{ x: 'max-content' }}
        />
      </div>

      <Modal
        title={editingStaff ? 'Chỉnh sửa thông tin nhân viên' : 'Thêm nhân viên mới'}
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={status === 'loading'}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="username"
              label="Tên đăng nhập"
              rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
            >
              <Input placeholder="Nhập tên đăng nhập" disabled={!!editingStaff} />
            </Form.Item>

            {!editingStaff && (
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[{ required: !editingStaff, message: 'Vui lòng nhập mật khẩu' }]}
              >
                <Input.Password placeholder="Nhập mật khẩu" />
              </Form.Item>
            )}

            <Form.Item
              name="name"
              label="Họ và tên"
              rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
            >
              <Input placeholder="Nhập họ và tên" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Vui lòng nhập email' },
                { type: 'email', message: 'Email không hợp lệ' }
              ]}
            >
              <Input placeholder="Nhập email" type="email" />
            </Form.Item>

            <Form.Item
              name="role"
              label="Vai trò"
              rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
            >
              <Select placeholder="Chọn vai trò">
                <Option value="ADMIN">Quản trị viên</Option>
                <Option value="COMPANY">Công ty</Option>
                <Option value="DRIVER">Tài xế</Option>
                <Option value="MEMBER">Thành viên</Option>
              </Select>
            </Form.Item>

            {editingStaff && (
                <Form.Item
                    name="password"
                    label="Mật khẩu mới"
                    rules={[
                      { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
                    ]}
                >
                  <Input.Password placeholder="Để trống nếu không đổi mật khẩu" />
                </Form.Item>
            )}

            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) => prevValues.role !== currentValues.role}
            >
              {({ getFieldValue }) =>
                getFieldValue('role') === 'DRIVER' || getFieldValue('role') === 'COMPANY' ? (
                  <Form.Item
                    name="companyId"
                    label="Công ty"
                    rules={[{ required: true, message: 'Vui lòng chọn công ty' }]}
                  >
                    <Select placeholder="Chọn công ty" showSearch optionFilterProp="children">
                      {companies.map(company => (
                        <Option key={company.id} value={company.id}>
                          {company.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                ) : null
              }
            </Form.Item>
          </div>
        </Form>
      </Modal>

      <ConfirmModal
        open={confirmModalVisible}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setConfirmModalVisible(false);
          setStaffToDelete(null);
        }}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa nhân viên "${staffToDelete?.name || staffToDelete?.username}" không?`}
      />
    </div>
  );
};

export default Staffs;
