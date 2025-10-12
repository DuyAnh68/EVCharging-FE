import { Outlet } from "react-router-dom";
import TopNavBar from "../components/TopNavBar/TopNavBar.jsx";
import Footer from "../components/Footer/Footer.jsx";

const MainLayout = () => {
  return (
    <div className="min-h-screen min-w-[99vw]">
      <div className="max-w-6xl mx-auto">
          <TopNavBar/>
          <main>
              <Outlet />
          </main>
          <Footer/>
      </div>
    </div>
  );
};

export default MainLayout;
