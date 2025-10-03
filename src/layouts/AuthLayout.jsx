import { Outlet, Link } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div>
      <h1>Auth Page</h1>
      <Link to="/auth/login">Login</Link>
      <Link to="/auth/register">Register</Link>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
