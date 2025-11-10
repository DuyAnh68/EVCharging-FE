import { Modal, Button } from "antd";

const ConfirmModal = ({
    open,
    onCancel,
    onConfirm,
    message = "Bạn có chắc chắn muốn thực hiện hành động này không?",
    okText = "Xóa",
    cancelText = "Hủy",
    title = "Xác nhận",
    loading = false,
}) => {
    return (
        <Modal
            open={open}
            title={
                <div className="flex items-center gap-2 text-lg">
                    <span>{title}</span>
                </div>
            }
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    {cancelText}
                </Button>,
                <Button
                    key="confirm"
                    type="primary"
                    danger
                    onClick={onConfirm}
                    loading={loading}
                >
                    {okText}
                </Button>,
            ]}
            centered
            className="[&_.ant-modal-content]:p-0 [&_.ant-modal-header]:px-6 [&_.ant-modal-header]:pt-6 [&_.ant-modal-header]:pb-3 [&_.ant-modal-body]:px-6 [&_.ant-modal-body]:pb-6 [&_.ant-modal-footer]:px-6 [&_.ant-modal-footer]:pt-3 [&_.ant-modal-footer]:pb-6 [&_.ant-modal-footer]:border-t [&_.ant-modal-footer]:border-gray-200 [&_.ant-modal-footer]:m-0"
        >
            <p className="text-gray-700 mb-0">{message}</p>
        </Modal>
    );
};

export default ConfirmModal;