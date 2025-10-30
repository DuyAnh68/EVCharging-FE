import { Input, Select } from "antd";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";

const StationFilter = () => {
    return (
        <div className="flex flex-col sm:flex-row gap-3 items-center mb-6 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
            <Input
                placeholder="Tìm kiếm theo tên hoặc địa chỉ..."
                prefix={<SearchOutlined />}
                className="sm:w-1/2"
            />
            <div className="flex items-center gap-2">
                <Select
                    prefix={<FilterOutlined />}
                    defaultValue="Tất cả loại trạm"
                    style={{ width: 180 }}
                    options={[
                        { value: "all", label: "Tất cả loại trạm" },
                        { value: "ac", label: "AC (Sạc chậm)" },
                        { value: "dc", label: "DC (Sạc nhanh)" },
                        { value: "mixed", label: "Hỗn hợp" },
                    ]}
                />
            </div>
        </div>
    );
};

export default StationFilter;
