import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useMemo } from "react";
import StationStats from "../../../components/Admin/StationManagement/StationStats";
import StationFilter from "../../../components/Admin/StationManagement/StationFilter";
import StationList from "../../../components/Admin/StationManagement/StationList";
import StationPagination from "../../../components/Admin/StationManagement/StationPagination";
import StationFormModal from "../../../components/Admin/StationManagement/StationFormModal.jsx";

const mockStations = [
    {
        id: 1,
        name: "VF3",
        code: "VF3",
        address: "123 Đường Lê Văn Lương, Quận 7, TP.HCM",
        type: "AC",
        chargers: [
            { id: "01", name: "A1", power: "12 kW", type: "Type 2", status: "Hoạt động" },
            { id: "02", name: "A2", power: "15 kW", type: "CCS2", status: "Không hoạt động" },
            { id: "03", name: "A3", power: "1244 kW", type: "CHAdeMO", status: "Bảo trì" },
        ],
    },
    {
        id: 2,
        name: "EV Quận 2",
        code: "EVQ2",
        address: "456 Đường Nguyễn Văn Hưởng, Quận 2, TP.HCM",
        type: "DC",
        chargers: [],
    },
    {
        id: 3,
        name: "Trạm Sạc Quận 1",
        code: "TSQ1",
        address: "789 Đường Đồng Khởi, Quận 1, TP.HCM",
        type: "AC",
        chargers: [
            { id: "C1", name: "C1", power: "22 kW", type: "Type 2", status: "Hoạt động" },
            { id: "C2", name: "C2", power: "50 kW", type: "CCS2", status: "Hoạt động" },
        ],
    },
    {
        id: 4,
        name: "Trạm Sạc Thủ Đức",
        code: "TSTD",
        address: "101 Đường Võ Văn Ngân, TP. Thủ Đức, TP.HCM",
        type: "DC",
        chargers: [
            { id: "T1", name: "T1", power: "60 kW", type: "CCS2", status: "Bảo trì" },
        ],
    },
    {
        id: 5,
        name: "EV Bình Thạnh",
        code: "EVBT",
        address: "202 Đường Xô Viết Nghệ Tĩnh, Quận Bình Thạnh, TP.HCM",
        type: "AC",
        chargers: [
            { id: "B1", name: "B1", power: "11 kW", type: "Type 2", status: "Hoạt động" },
            { id: "B2", name: "B2", power: "11 kW", type: "Type 2", status: "Hoạt động" },
        ],
    },
    {
        id: 6,
        name: "Trạm Sạc Quận 10",
        code: "TSQ10",
        address: "303 Đường 3/2, Quận 10, TP.HCM",
        type: "DC",
        chargers: [
            { id: "Q1", name: "Q1", power: "50 kW", type: "CCS2", status: "Hoạt động" },
            { id: "Q2", name: "Q2", power: "50 kW", type: "CCS2", status: "Không hoạt động" },
        ],
    },
    {
        id: 7,
        name: "EV Gò Vấp",
        code: "EVGV",
        address: "404 Quang Trung, Quận Gò Vấp, TP.HCM",
        type: "AC",
        chargers: [
            { id: "G1", name: "G1", power: "22 kW", type: "Type 2", status: "Hoạt động" },
        ],
    },
    {
        id: 8,
        name: "Trạm Sạc Tân Bình",
        code: "TSTB",
        address: "505 Cộng Hòa, Quận Tân Bình, TP.HCM",
        type: "DC",
        chargers: [
            { id: "TB1", name: "TB1", power: "60 kW", type: "CCS2", status: "Hoạt động" },
            { id: "TB2", name: "TB2", power: "60 kW", type: "CCS2", status: "Bảo trì" },
        ],
    },
    {
        id: 9,
        name: "EV Phú Nhuận",
        code: "EVPN",
        address: "606 Phan Xích Long, Quận Phú Nhuận, TP.HCM",
        type: "AC",
        chargers: [
            { id: "P1", name: "P1", power: "11 kW", type: "Type 2", status: "Hoạt động" },
            { id: "P2", name: "P2", power: "11 kW", type: "Type 2", status: "Hoạt động" },
        ],
    },
    {
        id: 10,
        name: "Trạm Sạc Quận 5",
        code: "TSQ5",
        address: "707 Nguyễn Trãi, Quận 5, TP.HCM",
        type: "DC",
        chargers: [
            { id: "Q51", name: "Q51", power: "50 kW", type: "CCS2", status: "Hoạt động" },
        ],
    },
    {
        id: 11,
        name: "EV Quận 8",
        code: "EVQ8",
        address: "808 Dương Bá Trạc, Quận 8, TP.HCM",
        type: "AC",
        chargers: [
            { id: "Q81", name: "Q81", power: "22 kW", type: "Type 2", status: "Không hoạt động" },
            { id: "Q82", name: "Q82", power: "22 kW", type: "Type 2", status: "Hoạt động" },
        ],
    },
    {
        id: 12,
        name: "Trạm Sạc Bình Tân",
        code: "TSBT",
        address: "909 Kinh Dương Vương, Quận Bình Tân, TP.HCM",
        type: "DC",
        chargers: [
            { id: "BT1", name: "BT1", power: "60 kW", type: "CCS2", status: "Hoạt động" },
            { id: "BT2", name: "BT2", power: "60 kW", type: "CCS2", status: "Hoạt động" },
        ],
    },
];

const ITEMS_PER_PAGE = 5;

const StationManagementPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(ITEMS_PER_PAGE);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const paginatedStations = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        return mockStations.slice(startIndex, startIndex + pageSize);
    }, [currentPage, pageSize]);

    const handlePageChange = (page, size) => {
        setCurrentPage(page);
        setPageSize(size);
    };

    const onOpenAddStationModal = () => {
        setIsAddModalOpen(true);
    };

    const handleAddStation = (values) => {
        console.log("Station added:", values);
        setIsAddModalOpen(false);
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1>Quản lý Trạm Sạc</h1>
                    <h2>Hệ thống quản lý trạm sạc xe điện</h2>
                </div>
                <Button type="primary" icon={<PlusOutlined />} onClick={onOpenAddStationModal}>
                    Thêm Trạm Sạc
                </Button>
            </div>

            {/* Stats Section */}
            <StationStats stations={mockStations} />

            {/* Filter Section */}
            <StationFilter />

            {/* Station List */}
            <StationList stations={paginatedStations} />

            {/* Pagination */}
            <StationPagination
                totalItems={mockStations.length}
                itemsPerPage={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />

            {/* Add Modal */}
            <StationFormModal
                open={isAddModalOpen}
                mode="add"
                onCancel={() => setIsAddModalOpen(false)}
                onSubmit={handleAddStation}
            />
        </div>
    );
};

export default StationManagementPage;
