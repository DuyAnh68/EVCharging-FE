import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Select, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStations, selectAllStations } from '../../../store/slices/chargingStationSlice';

const { Option } = Select;

const SpotFormModal = ({
                         open,
                         onCancel,
                         onSuccess,
                         initialValues,
                         loading = false
                       }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const stations = useSelector(selectAllStations);
  const isEditMode = !!initialValues?.id;

  // Fetch stations if not loaded
  useEffect(() => {
    if (stations.length === 0) {
      dispatch(fetchStations());
    }
  }, [dispatch, stations.length]);

  // Set form values when initialValues change
  useEffect(() => {
    if (open) {
      if (isEditMode) {
        form.setFieldsValue({
          ...initialValues,
          stationId: initialValues.station?.id
        });
      } else {
        form.setFieldsValue({
          spotName: ``,
          powerOutput: 0,
          status: 'AVAILABLE',
          spotType: 'BOOKING'
        });
      }
    }
  }, [open, initialValues, form, isEditMode]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const spotData = {
        ...(isEditMode && { id: initialValues.id }),
        spotName: values.spotName,
        powerOutput: Number(values.powerOutput),
        status: values.status,
        spotType: values.spotType,
        station: {
          id: values.stationId
        }
      };

      await onSuccess(spotData);
      form.resetFields();
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  return (
      <Modal
          title={isEditMode ? 'Chỉnh sửa cổng sạc' : 'Thêm cổng sạc mới'}
          open={open}
          onOk={handleSubmit}
          onCancel={onCancel}
          confirmLoading={loading}
          okText={isEditMode ? 'Cập nhật' : 'Thêm mới'}
          cancelText="Hủy"
          width={700}
          destroyOnHidden
      >
        <Form
            form={form}
            layout="vertical"
            initialValues={{
              status: 'AVAILABLE',
              powerOutput: 7.4,
              spotType: 'WALK_IN'
            }}
        >
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
                name="spotName"
                label="Tên cổng"
                rules={[
                  { required: true, message: 'Vui lòng nhập tên cổng' },
                  { max: 50, message: 'Tên cổng không vượt quá 50 ký tự' }
                ]}
            >
              <Input
                  placeholder="VD: SPOT-001"
                  disabled={isEditMode}
              />
            </Form.Item>

            <Form.Item
                name="powerOutput"
                label="Công suất (kW)"
                rules={[
                  { required: true, message: 'Vui lòng nhập công suất' },
                  { type: 'number', min: 0.1, message: 'Công suất phải lớn hơn 0' }
                ]}
            >
              <InputNumber
                  min={0.1}
                  step={0.1}
                  style={{ width: '100%' }}
                  placeholder="VD: 7.4"
              />
            </Form.Item>

            <Form.Item
                name="status"
                label="Trạng thái"
                rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
            >
              <Select>
                <Option value="AVAILABLE">Sẵn sàng</Option>
                <Option value="MAINTENANCE">Bảo trì</Option>
                <Option value="UNAVAILABLE">Không khả dụng</Option>
              </Select>
            </Form.Item>

            <Form.Item
                name="spotType"
                label="Loại cổng"
                rules={[{ required: true, message: 'Vui lòng chọn loại cổng' }]}
            >
              <Select>
                <Option value="BOOKING">BOOKING</Option>
                <Option value="WALK_IN">WALK_IN</Option>
              </Select>
            </Form.Item>

            <Form.Item
                name="stationId"
                label="Trạm sạc"
                rules={[{ required: true, message: 'Vui lòng chọn trạm sạc' }]}
                className="col-span-2"
            >
              <Select
                  showSearch
                  placeholder="Chọn trạm sạc"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                      option?.children?.join()?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0
                  }
                  disabled={isEditMode}
              >
                {stations?.map(station => (
                    <Option key={station?.id} value={station?.id}>
                      {station.name} - {station.location}
                    </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </Form>
      </Modal>
  );
};

export default SpotFormModal;