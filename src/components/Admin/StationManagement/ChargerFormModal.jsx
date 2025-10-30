import {Modal, Form, Input, Select, InputNumber, Button} from "antd";
import { useEffect } from "react";

const chargerTypes = [
    { value: "Type 2", label: "Type 2" },
    { value: "CCS2", label: "CCS2" },
    { value: "CHAdeMO", label: "CHAdeMO" },
];

const statusOptions = [
    { value: "Hoạt động", label: "Hoạt động" },
    { value: "Không hoạt động", label: "Không hoạt động" },
    { value: "Bảo trì", label: "Bảo trì" },
];

const ChargerFormModal = ({
                              open,
                              onCancel,
                              onSubmit,
                              mode = "add",
                              initialValues = {}
                          }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (mode === "edit" && initialValues) {
            form.setFieldsValue(initialValues);
        } else {
            form.resetFields();
        }
    }, [mode, initialValues, form]);

    const handleFinish = (values) => {
        onSubmit(values);
        form.resetFields();
    };

    return (
        <Modal
            title={
                <span className="text-xl font-semibold">
                    {mode === "edit" ? "Chỉnh sửa cổng sạc" : "Thêm cổng sạc mới"}
                </span>
            }
            open={open}
            onCancel={onCancel}
            footer={null}
            centered
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                requiredMark={false}
            >
                <Form.Item
                    label="Tên cổng sạc"
                    name="name"
                    rules={[{ required: true, message: "Vui lòng nhập tên cổng sạc" }]}
                >
                    <Input placeholder="VD: Cổng A1" />
                </Form.Item>

                <Form.Item
                    label="Số hiệu cổng"
                    name="id"
                    rules={[{ required: true, message: "Vui lòng nhập số hiệu cổng" }]}
                >
                    <Input placeholder="VD: A1, B2" style={{ textTransform: "uppercase" }} />
                </Form.Item>

                <Form.Item
                    label="Công suất (kW)"
                    name="power"
                    rules={[{ required: true, message: "Vui lòng nhập công suất" }]}
                >
                    <InputNumber
                        placeholder="VD: 22"
                        min={0}
                        step={0.1}
                        className="w-full"
                        addonAfter="kW"
                    />
                </Form.Item>

                <Form.Item
                    label="Loại đầu sạc"
                    name="type"
                    rules={[{ required: true, message: "Vui lòng chọn loại đầu sạc" }]}
                >
                    <Select
                        placeholder="Chọn loại đầu sạc"
                        options={chargerTypes}
                    />
                </Form.Item>

                <Form.Item
                    label="Trạng thái"
                    name="status"
                    initialValue="Hoạt động"
                    rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
                >
                    <Select
                        placeholder="Chọn trạng thái"
                        options={statusOptions}
                    />
                </Form.Item>

                <div className="flex justify-end gap-2 mt-6">
                    <Button onClick={onCancel}>Hủy</Button>
                    <Button type="primary" htmlType="submit">
                        {mode === "edit" ? "Lưu thay đổi" : "Thêm mới"}
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default ChargerFormModal;