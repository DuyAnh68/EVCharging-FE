import React, { useState } from "react";
import { Layout, Menu, Button, Dropdown } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  CarOutlined,
  HomeOutlined,
  ThunderboltOutlined,
  CreditCardOutlined,
  BankOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Logo from "../assets/Images/Logo.png";
import useAuth from "../hooks/useAuth.js"; // import hook auth

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const user = JSON.parse(localStorage.getItem("user")); // lấy info user

  const handleLogout = async () => {
    await logout();
    navigate("/"); // redirect về home/login
  };

  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: <Link to="/admin">Dashboard</Link>,
    },
    {
      key: "2",
      icon: <HomeOutlined />,
      label: <Link to="/admin/stations">Trạm sạc</Link>,
    },
    {
      key: "3",
      icon: <ThunderboltOutlined />,
      label: <Link to="/admin/spots">Cổng sạc</Link>,
    },
    {
      key: "4",
      icon: <CarOutlined />,
      label: <Link to="/admin/vehicle-models">Mẫu xe</Link>,
    },
    {
      key: "5",
      icon: <CarOutlined />,
      label: <Link to="/admin/vehicle-brands">Hãng xe</Link>,
    },
    {
      key: "6",
      icon: <CreditCardOutlined />,
      label: <Link to="/admin/subscription-plans">Gói đăng ký</Link>,
    },
    {
      key: "7",
      icon: <BankOutlined />,
      label: <Link to="/admin/companies">Công ty</Link>,
    },
    {
      key: "8",
      icon: <TeamOutlined />,
      label: <Link to="/admin/staffs">Nhân viên</Link>,
    },
  ];

  const selectedKey = () => {
    const path = location.pathname;
    if (path === "/admin") return "1";
    if (path.startsWith("/admin/stations")) return "2";
    if (path.startsWith("/admin/spots")) return "3";
    if (path.startsWith("/admin/vehicle-models")) return "4";
    if (path.startsWith("/admin/vehicle-brands")) return "5";
    if (path.startsWith("/admin/subscription-plans")) return "6";
    if (path.startsWith("/admin/companies")) return "7";
    if (path.startsWith("/admin/staffs")) return "8";
    return "1";
  };

  // User Dropdown
  const userMenu = (
    <div className="p-2 w-48 bg-white rounded-lg shadow-md border border-gray-100">
      <p className="text-sm font-medium truncate">{user?.name || "Admin"}</p>
      <p className="text-xs text-gray-500 truncate">
        {user?.email || "admin@evcharge.com"}
      </p>
      <button
        onClick={handleLogout}
        className="w-full mt-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition"
      >
        Đăng xuất
      </button>
    </div>
  );

  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        style={{ background: "#FFF" }}
        className="min-h-screen shadow-md"
      >
        <div className="flex items-center justify-center p-2">
          <div className="flex items-center gap-2">
            <img className="h-12 w-auto" src={Logo} alt="EV Charge" />
            {!collapsed && (
              <span className="text-gray-900 font-bold text-3xl">
                EV Charge
              </span>
            )}
          </div>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[selectedKey()]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header className="bg-white flex items-center justify-between px-4">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <Dropdown
            overlay={userMenu}
            placement="bottomRight"
            trigger={["click"]}
          >
            <div className="flex items-center gap-2 cursor-pointer">
              <UserOutlined className="text-lg" />
              <span className="hidden sm:block">{user?.name || "Admin"}</span>
            </div>
          </Dropdown>
        </Header>
        <Content className="min-h-screen py-6 px-12 bg-gray-50">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
