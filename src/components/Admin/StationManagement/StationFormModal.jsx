import { Modal, Form, Input, Select, Row, Col, Button } from "antd";
import { useEffect } from "react";

const StationFormModal = ({
                              open,
                              mode = "add",
                              onCancel,
                              onSubmit,
                              initialValues = {},
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
          {mode === "edit" ? "Chỉnh sửa trạm sạc" : "Thêm trạm sạc mới"}
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
                {/* Station Name */}
                <Form.Item
                    label="Tên trạm sạc *"
                    name="name"
                    rules={[{ required: true, message: "Vui lòng nhập tên trạm sạc" }]}
                >
                    <Input placeholder="VD: Trạm sạc Quận 1" />
                </Form.Item>

                {/* Station Code */}
                <Form.Item
                    label="Mã trạm sạc *"
                    name="code"
                    rules={[
                        { required: true, message: "Vui lòng nhập mã trạm" },
                        {
                            pattern: /^[A-Z0-9]{3,10}$/,
                            message: "Mã trạm phải từ 3-10 ký tự chữ số hoặc chữ in hoa",
                        },
                    ]}
                >
                    <Input
                        placeholder="VD: TSQ1, EVHCM001"
                        maxLength={10}
                        style={{ textTransform: "uppercase" }}
                    />
                </Form.Item>

                {/* Address */}
                <Form.Item
                    label="Địa chỉ *"
                    name="address"
                    rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
                >
                    <Input placeholder="VD: 123 Nguyễn Huệ, Quận 1, TP.HCM" />
                </Form.Item>

                {/* Type */}
                <Form.Item
                    label="Loại trạm sạc *"
                    name="type"
                    rules={[{ required: true, message: "Vui lòng chọn loại trạm" }]}
                >
                    <Select
                        placeholder="Chọn loại trạm sạc"
                        options={[
                            { value: "AC", label: "AC (Sạc chậm)" },
                            { value: "DC", label: "DC (Sạc nhanh)" },
                        ]}
                    />
                </Form.Item>

                {/* Coordinates */}
                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item
                            label="Vĩ độ"
                            name="latitude"
                            rules={[{ required: true, message: "Nhập vĩ độ" }]}
                        >
                            <Input placeholder="10.7769" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Kinh độ"
                            name="longitude"
                            rules={[{ required: true, message: "Nhập kinh độ" }]}
                        >
                            <Input placeholder="106.7009" />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Buttons */}
                <div className="flex justify-end gap-2 mt-4">
                    <Button onClick={onCancel}>Hủy</Button>
                    <Button type="primary" htmlType="submit">
                        {mode === "edit" ? "Lưu thay đổi" : "Thêm mới"}
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default StationFormModal;
