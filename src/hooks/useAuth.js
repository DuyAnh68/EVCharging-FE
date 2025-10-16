import { useState } from "react";
import authApi from "../api/authApi";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Kiểm tra isAuthenticated dựa trên user và token
  const isAuthenticated = !!user && !!localStorage.getItem("access_token");

  // Hàm đăng nhập giả lập
  const loginUser = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authApi.login(credentials);

      if (response) {
        localStorage.setItem("access_token", response.result.token);
        return { success: true };
      } else {
        throw new Error("Email hoặc mật khẩu không đúng");
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem("access_token");
  };

  return {
    isAuthenticated,
    user,
    loading,
    error,
    login: loginUser,
    logout: logoutUser,
  };
};

export default useAuth;
