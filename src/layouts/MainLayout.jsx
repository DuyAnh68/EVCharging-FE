import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer.jsx";
import Header from "../components/Layout/Header.jsx";

const MainLayout = () => {
  return (
    <div className="flex flex-col bg-gray-50 overflow-x-hidden h-full">
      <Header />
      <div className="flex-1 bg-[#F6F9EE] min-w-screen min-h-screen">
        <main className="container mt-10 mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
