import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Modal } from 'antd';

const StationFormModal = ({ 
  open, 
  onCancel, 
  onSubmit, 
  mode, 
  initialValues,
  loading = false 
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (mode === 'edit' && initialValues) {
      form.setFieldsValue({
        name: initialValues.name || '',
        location: initialValues.location || '',
        powerCapacity: initialValues.powerCapacity || 0,
        pricePerKwh: initialValues.pricePerKwh || 0,
        latitude: initialValues.latitude || 0,
        longitude: initialValues.longitude || 0,
        imageUrl: initialValues.imageUrl || '',
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, mode, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      // Format the data to match the API schema
      const formattedData = {
        ...values,
        powerCapacity: Number(values.powerCapacity),
        pricePerKwh: Number(values.pricePerKwh),
        latitude: Number(values.latitude),
        longitude: Number(values.longitude),
      };

      if (mode === 'edit' && initialValues?.id) {
        formattedData.id = initialValues.id;
      }

      await onSubmit(formattedData);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title={mode === 'add' ? 'Thêm trạm sạc mới' : 'Chỉnh sửa trạm sạc'}
      open={open}
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
      width={700}
      okText={mode === 'add' ? 'Thêm' : 'Cập nhật'}
      cancelText="Hủy"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: '',
          location: '',
          powerCapacity: 0,
          pricePerKwh: 0,
          latitude: 0,
          longitude: 0,
          imageUrl: '',
        }}
      >
        <div className="grid grid-cols-2 gap-3">
          <Form.Item
            name="name"
            label="Tên trạm"
            rules={[{ required: true, message: 'Vui lòng nhập tên trạm!' }]}
          >
            <Input placeholder="Nhập tên trạm" />
          </Form.Item>

          <Form.Item
            name="location"
            label="Địa chỉ"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
          >
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>

          <Form.Item
            name="powerCapacity"
            label="Công suất tối đa (kW)"
            rules={[{ required: true, message: 'Vui lòng nhập công suất tối đa!' }]}
          >
            <InputNumber 
              min={0} 
              step={0.1} 
              style={{ width: '100%' }} 
              placeholder="VD: 50"
            />
          </Form.Item>

          <Form.Item
            name="pricePerKwh"
            label="Giá mỗi kWh (VND)"
            rules={[{ required: true, message: 'Vui lòng nhập giá mỗi kWh!' }]}
          >
            <InputNumber
              min={0}
              step={100}
              style={{ width: '100%' }}
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\s?VND|,*/g, '')}
              addonAfter="VND"
            />
          </Form.Item>

          <Form.Item
            name="latitude"
            label="Vĩ độ"
            rules={[{ required: true, message: 'Vui lòng nhập vĩ độ!' }]}
          >
            <InputNumber 
              style={{ width: '100%' }} 
              placeholder="VD: 10.762622"
              step={0.000001}
            />
          </Form.Item>

          <Form.Item
            name="longitude"
            label="Kinh độ"
            rules={[{ required: true, message: 'Vui lòng nhập kinh độ!' }]}
          >
            <InputNumber 
              style={{ width: '100%' }} 
              placeholder="VD: 106.660172"
              step={0.000001}
            />
          </Form.Item>

          <Form.Item
            name="imageUrl"
            label="Đường dẫn hình ảnh"
            rules={[{ type: 'url', message: 'Vui lòng nhập URL hợp lệ!' }]}
          >
            <Input placeholder="https://example.com/image.jpg" />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default StationFormModal;
