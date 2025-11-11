import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer.jsx";
import CompanyHeader from "../components/Layout/CompanyHeader.jsx";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <CompanyHeader />
      <main className="flex-1 min-h-screen bg-gradient-to-br from-[#E6F7E9] via-[#F6F9EE] to-[#FFFFFF] min-w-screen mt-10 py-8">
        <div className="min-w-screen mx-auto px-4 sm:px-6 lg:px-8 ">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
