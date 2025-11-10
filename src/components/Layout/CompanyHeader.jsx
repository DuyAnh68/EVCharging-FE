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
      ? "relative !text-green-600 font-semibold px-4 py-2 text-sm transition duration-200 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-green-500 after:rounded-full"
      : "relative !text-gray-600 hover:!text-green-500 px-4 py-2 text-sm font-medium transition duration-200 hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:right-0 hover:after:h-0.5 hover:after:bg-green-300 hover:after:rounded-full";

  const navLinkClassUnauthenticated =
    "relative !text-gray-600 hover:!text-green-500 px-4 py-2 text-sm font-medium transition duration-200 hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:right-0 hover:after:h-0.5 hover:after:bg-green-300 hover:after:rounded-full";

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Nav */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                className="h-10 w-auto transition-transform group-hover:scale-105"
                src={Logo}
                alt="EV Charge"
              />
              <span className="text-gray-900 font-extrabold text-2xl tracking-tight">
                EV<span className="text-green-600">Charge</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-2">
              <NavLink
                to="/company/user"
                className={
                  isAuthenticated ? navLinkClass : navLinkClassUnauthenticated
                }
              >
                Tài xế
              </NavLink>

              {isAuthenticated ? (
                <NavLink to="/booking" className={navLinkClass}>
                  Xe 
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
                  to="/auth/login"
                  className={navLinkClassUnauthenticated}
                >
                  Tài khoản
                </NavLink>
              )}
            </nav>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <button
                  className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors"
                  onClick={() => navigate("/auth/login")}
                >
                  Đăng nhập
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:bg-green-600 hover:shadow-md transition-all"
                  onClick={() => navigate("/auth/register")}
                >
                  Đăng ký
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full">
                  <div className="w-8 h-8 bg-green-500 text-white flex items-center justify-center rounded-full font-semibold mr-2">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="text-gray-800 text-sm font-medium">
                    {user?.name || "User"}
                  </span>
                </div>
                <button
                  className="text-gray-600 hover:text-red-500 text-sm font-medium transition-colors"
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
