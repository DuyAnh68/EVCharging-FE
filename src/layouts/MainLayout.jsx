import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer.jsx";
import Header from "../components/Layout/Header.jsx";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 min-h-screen bg-[#F6F9EE] min-w-screen mt-10 py-8">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
