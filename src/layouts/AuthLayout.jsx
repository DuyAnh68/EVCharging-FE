import { Outlet, Link } from "react-router-dom";
import Header from "../components/Layout/Header";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

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

export default AuthLayout;
