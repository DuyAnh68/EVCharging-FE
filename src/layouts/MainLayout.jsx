import { Outlet } from "react-router-dom";
import Header from "../components/Layout/Header";
import { useNavigate } from "react-router-dom";

const MainLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated={true} handleLogout={handleLogout} />
      <div className="pt-16">
        <div className="min-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
