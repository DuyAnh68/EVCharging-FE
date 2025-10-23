import { useState } from "react";
import authApi from "../api/authApi";
import { jwtDecode } from "jwt-decode"; // npm install jwt-decode

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("access_token");
  const isAuthenticated = !!token;

  // Nếu có token thì tự decode để giữ trạng thái user khi reload trang
  if (isAuthenticated && !user) {
    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch (err) {
      console.error("Token không hợp lệ:", err);
      localStorage.removeItem("access_token");
    }
  }

  // Hàm đăng nhập giả lập
  const loginUser = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authApi.login(credentials);

      if (response?.result?.token) {
        const token = response.result.token;

        localStorage.setItem("access_token", token);

        const decodedUser = jwtDecode(token);
        setUser(decodedUser);

        console.log("User decoded từ token:", decodedUser);

        return { success: true, user: decodedUser };
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

  const registerUser = async (data) => {
    setLoading(true);
    setError(null);
    console.log(data);

    try {
      const response = await authApi.register(data);

      if (response?.code == 1000) {
        return { success: true, message: response.result.message };
      } else {
        throw new Error("Đăng ký thất bại");
      }
    } catch (err) {
      setError(err.message || "Đăng ký thất bại");
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
    registerUser,
    logout: logoutUser,
  };
};

export default useAuth;
