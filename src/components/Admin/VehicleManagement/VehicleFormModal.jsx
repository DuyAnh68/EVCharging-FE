import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Modal, Typography, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchVehicleBrands,
  selectAllVehicleBrands,
  selectVehicleBrandsStatus
} from "../../../store/slices/vehicleBrandSlice.js";

const { Text } = Typography;
const { Option } = Select;

const VehicleFormModal = ({
                            open,
                            onCancel,
                            onSubmit,
                            initialValues,
                            loading = false,
                            mode = 'add'
                          }) => {
  const dispatch = useDispatch();
  const brands = useSelector(selectAllVehicleBrands);
  const status = useSelector(selectVehicleBrandsStatus);
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      // Fetch brands when modal opens
      dispatch(fetchVehicleBrands());
      form.resetFields();
      if (initialValues) {
        form.setFieldsValue({
          ...initialValues,
          brandId: initialValues.brandId?.toString()
        });
      }
    }
  }, [open, initialValues, form, dispatch]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      // Convert brandId back to number before submitting
      const submitValues = {
        ...values,
        brandId: Number(values.brandId),
        batteryCapacity: Number(values.batteryCapacity)
      };
      onSubmit(submitValues);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
      <Modal
          title={mode === 'add' ? 'Thêm mẫu xe mới' : 'Chỉnh sửa thông tin xe'}
          open={open}
          onCancel={onCancel}
          onOk={handleSubmit}
          confirmLoading={loading}
          okText={mode === 'add' ? 'Thêm mới' : 'Cập nhật'}
          cancelText="Hủy"
          width={700}
          destroyOnHidden
      >
        <Form
            form={form}
            layout="vertical"
            initialValues={{
              brandId: undefined,
              modelName: '',
              connector: '',
              batteryCapacity: 0,
              url: ''
            }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
                name="brandId"
                label="Hãng xe"
                rules={[{ required: true, message: 'Vui lòng chọn hãng xe' }]}
            >
              <Select
                  placeholder="Chọn hãng xe"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  loading={status === 'loading'}
              >
                {brands.map(brand => (
                    <Option key={brand.id} value={brand.id.toString()}>
                      {brand.name}
                    </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
                name="modelName"
                label="Mẫu xe"
                rules={[
                  { required: true, message: 'Vui lòng nhập tên mẫu xe' },
                  { max: 100, message: 'Tên mẫu xe không quá 100 ký tự' }
                ]}
            >
              <Input placeholder="VD: VF e34, Model 3, IONIQ 5..." />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
                name="connector"
                label="Chuẩn sạc"
                rules={[
                  { required: true, message: 'Vui lòng nhập chuẩn sạc' },
                  { max: 100, message: 'Chuẩn sạc không quá 100 ký tự' }
                ]}
            >
              <Input placeholder="VD: Type 2 (Mennekes), CCS (Combo 2)..." />
            </Form.Item>

            <Form.Item
                name="batteryCapacity"
                label="Dung lượng pin (kWh)"
                rules={[
                  { required: true, message: 'Vui lòng nhập dung lượng pin' },
                  { type: 'number', min: 0.1, message: 'Dung lượng pin phải lớn hơn 0' },
                  { type: 'number', max: 1000, message: 'Dung lượng pin không quá 1000 kWh' }
                ]}
            >
              <InputNumber
                  style={{ width: '100%' }}
                  min={0.1}
                  max={1000}
                  step={0.1}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\s?kWh|(,*)/g, '')}
                  addonAfter="kWh"
              />
            </Form.Item>
          </div>

          <Form.Item
              name="url"
              label="Đường dẫn hình ảnh (tùy chọn)"
              rules={[
                { type: 'url', message: 'Vui lòng nhập URL hợp lệ' },
                { max: 500, message: 'Đường dẫn không quá 500 ký tự' }
              ]}
          >
            <Input placeholder="https://example.com/image.jpg" />
          </Form.Item>

          {form.getFieldValue('url') && (
              <div className="mb-4">
                <Text type="secondary" className="block mb-2">Xem trước hình ảnh:</Text>
                <div className="w-full h-48 bg-gray-100 rounded overflow-hidden">
                  <img
                      src={form.getFieldValue('url')}
                      alt="Preview"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5Y2EwYjAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1pbWFnZS1vZmYiPjB4MDAgMGUwMCI+PC9wYXRoPjxwYXRoIGQ9Ik0yIDYuMjhMxMiAxMmwxMC02LjI4YTIgMiAwIDAgMC0yLjY1LS4zMkwxMiAxMiA0LjY1IDYuN0EyIDIgMCAwIDAgMiA2LjI4WiI+PC9wYXRoPjxwYXRoIGQ9Im0yMCAxMi04IDUtOC01Ij48L3BhdGg+PHBhdGggZD0iTTIgMTIuNzJ2Ny4xMkEyIDIgMCAwIDAgNCAyMWgxNmEyIDIgMCAwIDAgMi0yVjEyLjIiPjwvcGF0aD48L3N2Zz4=';
                      }}
                  />
                </div>
              </div>
          )}
        </Form>
      </Modal>
  );
};

export default VehicleFormModal;