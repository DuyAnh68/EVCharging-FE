import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/Images/Logo.png";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "relative !text-gray-900 px-4 py-3 text-sm font-medium transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-green-500 after:rounded-full"
      : "relative !text-gray-600 hover:text-gray-900 px-4 py-3 text-sm font-medium transition-colors duration-200  hover:after:bottom-0 hover:after:left-0 hover:after:right-0 hover:after:h-0.5 hover:after:bg-green-300 hover:after:rounded-full";

  const navLinkClassUnauthenticated =
    "relative !text-gray-600 hover:text-gray-900 px-4 py-3 text-sm font-medium transition-colors duration-200 hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:right-0 hover:after:h-0.5 hover:after:bg-green-300 hover:after:rounded-full";

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 overflow-x-hidden">
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
                to={isAuthenticated ? "/" : "/"}
                className={
                  isAuthenticated ? navLinkClass : navLinkClassUnauthenticated
                }
              >
                Bản đồ
              </NavLink>
              {isAuthenticated ? (
                <NavLink to="/booking" className={navLinkClass}>
                  Đặt chỗ
                </NavLink>
              ) : (
                <NavLink
                  to="/auth/login"
                  className={navLinkClassUnauthenticated}
                >
                  Đặt chỗ
                </NavLink>
              )}
              {isAuthenticated ? (
                <NavLink to="/vehicle" className={navLinkClass}>
                  Xe của bạn
                </NavLink>
              ) : (
                <NavLink
                  to="/auth/login"
                  className={navLinkClassUnauthenticated}
                >
                  Xe của bạn
                </NavLink>
              )}
              {isAuthenticated ? (
                <NavLink to="/account" className={navLinkClass}>
                  Tài khoản
                </NavLink>
              ) : (
                <NavLink
                  to={"/auth/login"}
                  className={navLinkClassUnauthenticated}
                >
                  Tài khoản
                </NavLink>
              )}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <button
                  className="text-gray-600 hover:text-green-500 px-3 py-2 text-sm font-medium"
                  onClick={() => {
                    navigate("/auth/login");
                  }}
                >
                  Đăng nhập
                </button>
                <button
                  className="!bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition-colors"
                  onClick={() => {
                    navigate("/auth/register");
                  }}
                >
                  Đăng ký
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 text-sm">
                  Xin chào, {user?.name || "User"}
                </span>
                <button
                  className="!text-gray-600 hover:text-green-500 px-3 py-2 text-sm font-medium"
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
