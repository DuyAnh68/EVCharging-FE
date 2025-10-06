import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/Images/Logo.png";

const Header = ({ isAuthenticated, handleLogout }) => {
  const navigate = useNavigate();
  console.log(isAuthenticated);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "!text-green-500 border-b-2 border-green-500 px-3 py-2 text-sm font-medium"
      : "!text-gray-600 hover:!text-green-500 px-3 py-2 text-sm font-medium";

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center gap-5">
            <Link to="/" className="flex items-center space-x-2">
              <img className="h-12 w-auto" src={Logo} alt="EV Charge" />
              <span className="text-gray-900 font-bold text-3xl">
                EV Charge
              </span>
            </Link>
            <nav className="hidden md:flex m-auto p-auto">
              <NavLink
                to={isAuthenticated ? "/" : "/auth"}
                className={navLinkClass}
              >
                Bản đồ
              </NavLink>
              <NavLink
                to={isAuthenticated ? "/booking" : "/auth/login"}
                className={navLinkClass}
              >
                Đặt chỗ
              </NavLink>
              <NavLink
                to={isAuthenticated ? "/vehicle" : "/auth/login"}
                className={navLinkClass}
              >
                Xe của bạn
              </NavLink>
              <NavLink
                to={isAuthenticated ? "/account" : "/auth/login"}
                className={navLinkClass}
              >
                Tài khoản
              </NavLink>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <button
                  className="text-gray-600 hover:text-green-500 px-3 py-2 text-sm font-medium"
                  onClick={() => {
                    navigate("/guest/login");
                  }}
                >
                  Đăng nhập
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition-colors"
                  onClick={() => {
                    navigate("/guest/register");
                  }}
                >
                  Đăng ký
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 text-sm">Xin chào, Duy Anh</span>
                <button
                  className="text-gray-600 hover:text-green-500 px-3 py-2 text-sm font-medium"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
