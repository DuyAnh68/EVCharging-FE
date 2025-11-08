import StationStats from "../../../components/Admin/StationManagement/StationStats.jsx";
import {mockStations} from "../../../data/mockStations.js";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1>Dashboard</h1>
      <StationStats stations={mockStations} />
    </div>
  );
};

export default Dashboard;