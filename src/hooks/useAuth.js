import { useState, useEffect } from "react";

// Dữ liệu user giả lập (di chuyển ra ngoài component để tránh dependency warning)
const mockUsers = [
  {
    id: 1,
    email: "admin@example.com",
    password: "123456",
    name: "Admin User",
    role: "admin",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    email: "user@example.com",
    password: "123456",
    name: "Test User",
    role: "user",
    avatar: "https://via.placeholder.com/150",
  },
];

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
      // Giả lập delay API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Tìm user trong mock data
      const foundUser = mockUsers.find(
        (u) =>
          u.email === credentials.email && u.password === credentials.password
      );

      if (foundUser) {
        // Tạo token giả
        const mockToken = `mock_token_${Date.now()}_${foundUser.id}`;
        localStorage.setItem("access_token", mockToken);

        // Lưu thông tin user (không bao gồm password)
        const { password: _password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);

        return { success: true, user: userWithoutPassword };
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

  // Hàm đăng xuất
  const logoutUser = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem("access_token");
  };

  // Hàm đăng ký giả lập
  const registerUser = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      // Giả lập delay API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Kiểm tra email đã tồn tại chưa
      const existingUser = mockUsers.find((u) => u.email === userData.email);
      if (existingUser) {
        throw new Error("Email đã được sử dụng");
      }

      // Tạo user mới
      const newUser = {
        id: mockUsers.length + 1,
        ...userData,
        role: "user",
        avatar: "https://via.placeholder.com/150",
      };

      // Thêm vào mock data (trong thực tế sẽ gọi API)
      mockUsers.push(newUser);

      return { success: true, message: "Đăng ký thành công" };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Kiểm tra token khi component mount
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token && !user) {
      // Giả lập việc verify token và lấy thông tin user
      const tokenParts = token.split("_");
      const userId = tokenParts[tokenParts.length - 1];
      const foundUser = mockUsers.find((u) => u.id === parseInt(userId));

      if (foundUser) {
        const { password: _password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
      } else {
        // Token không hợp lệ, xóa token
        localStorage.removeItem("access_token");
      }
    }
  }, [user]);

  return {
    isAuthenticated,
    user,
    loading,
    error,
    login: loginUser,
    logout: logoutUser,
    register: registerUser,
  };
};

export default useAuth;
