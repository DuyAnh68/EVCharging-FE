import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer.jsx";
import Header from "../components/Layout/Header.jsx";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Header />
      <div className="pt-16 ">
        <div className="min-w-[99vw] bg-[#F6F9EE] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
