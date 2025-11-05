import "./style.css";
import { Pagination } from "antd";
import { useState } from "react";

const StationPagination = ({
    totalItems = 0,
    itemsPerPage = 10,
    currentPage = 1,
    onPageChange,
    showSizeChanger = true,
    showTotal = (total) => `Tổng ${total} trạm`,
}) => {
    const [pageSize, setPageSize] = useState(itemsPerPage);

    const handleChange = (page, size) => {
        if (size !== pageSize) {
            setPageSize(size);
            onPageChange(1, size);
        } else {
            onPageChange(page, size);
        }
    };

    return (
        <div className="flex justify-end mt-4 bg-white p-3 rounded-lg shadow-sm">
            <Pagination
                current={currentPage}
                total={totalItems}
                pageSize={pageSize}
                onChange={handleChange}
                showSizeChanger={showSizeChanger}
                showTotal={showTotal}
                pageSizeOptions={[5, 10, 20, 50]}
            />
        </div>
    );
};

export default StationPagination;