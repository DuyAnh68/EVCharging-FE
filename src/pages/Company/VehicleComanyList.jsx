import { Link } from "react-router-dom";
import VehicleCompanyListGrid from "../../components/Company/CompanyVehicleListGrid.jsx";
const VehicleCompanyList = () => {
    return (
    <div className="min-h-screen px-6 py-10">
      <div className="top flex justify-between max-w-7xl mx-auto mb-1">
        <div className="title !text-[#14AE5C] text-4xl font-bold">
          Danh sách xe của bạn
        </div>

        <div className="button">
          <Link
            to="/company/addVehicle"
            className="!bg-[#009951] !text-white border border-[1] !border-black px-4 py-2 rounded-lg hover:!bg-[#00b35c] transition"
          >
            Thêm xe
          </Link>
        </div>
      </div>
      <div className="middle ">
        <VehicleCompanyListGrid/>
      </div>
    </div>
  );
}
export default VehicleCompanyList;
