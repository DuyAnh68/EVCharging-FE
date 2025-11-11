import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  CarOutlined,
  HomeOutlined,
  ThunderboltOutlined,
  CreditCardOutlined,
  BankOutlined,
  TeamOutlined
} from '@ant-design/icons';
import Logo from "../assets/Images/Logo.png";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: <Link to="/admin">Dashboard</Link>,
    },
    {
      key: '2',
      icon: <HomeOutlined />,
      label: <Link to="/admin/stations">Trạm sạc</Link>,
    },
    {
      key: '3',
      icon: <ThunderboltOutlined />,
      label: <Link to="/admin/spots">Cổng sạc</Link>,
    },
    {
      key: '4',
      icon: <CarOutlined />,
      label: <Link to="/admin/vehicle-models">Mẫu xe</Link>,
    },
    {
      key: '5',
      icon: <CarOutlined />,
      label: <Link to="/admin/vehicle-brands">Hãng xe</Link>,
    },
    {
      key: '6',
      icon: <CreditCardOutlined />,
      label: <Link to="/admin/subscription-plans">Gói đăng ký</Link>,
    },
    {
      key: '7',
      icon: <BankOutlined  />,
      label: <Link to="/admin/companies">Công ty</Link>,
    },
    {
      key: '8',
      icon: <TeamOutlined />,
      label: <Link to="/admin/staffs">Nhân viên</Link>,
    },

  ];

  const selectedKey = () => {
    const path = location.pathname;
    if (path === '/admin') return '1';
    if (path.startsWith('/admin/stations')) return '2';
    if (path.startsWith('/admin/spots')) return '3';
    if (path.startsWith('/admin/vehicle-models')) return '4';
    if (path.startsWith('/admin/vehicle-brands')) return '5';
    if (path.startsWith('/admin/subscription-plans')) return '6';
    if (path.startsWith('/admin/companies')) return '7';
    if (path.startsWith('/admin/staffs')) return '8';
    return '1';
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        style={{ background: '#FFF'}}
        className="min-h-screen shadow-md"
      >
        <div className="flex items-center justify-center">
          <div className="flex flex-row justify-center items-center gap-2 p-2">
            {collapsed ? <img className="h-12 w-auto" src={Logo} alt="EV Charge" /> : <>
                <img className="h-12 w-auto" src={Logo} alt="EV Charge" />
                <span className="text-gray-900 font-bold text-3xl">
                    EV Charge
                </span>
            </>}
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
        <Header
          className="bg-white flex items-center"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 40,
              height: 40,
            }}
          />
        </Header>
        <Content
            className="min-h-screen py-6 px-12 bg-gray-50"
            style={{minWidth: 'calc(100vw - 250px)'}}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;