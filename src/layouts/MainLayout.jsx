import { Outlet, Link } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen min-w-screen flex-1">
      <div className="header bg-amber-200 justify-items-center flex-row">
        <nav className="gap-10 justify-between bg-amber-600 p-10 flex">
          <Link to="/">Home</Link>
          <Link to="/subscription">Subscription</Link>
          <Link to={"/vehicle"}>Vehicle</Link>
        </nav>
      </div>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
