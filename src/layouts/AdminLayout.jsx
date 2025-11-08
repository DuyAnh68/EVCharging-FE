import { useState } from 'react';
import {Button, Layout, Menu} from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  ControlOutlined
} from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom';
import Logo from "../assets/Images/Logo.png";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

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
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: '1',
              icon: <DashboardOutlined />,
              label: <Link to="/admin">Dashboard</Link>,
            },
            {
              key: '2',
              icon: <ControlOutlined />,
              label: <Link to="/admin/stations">Stations</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="bg-white flex items-center"
        >
          <Button
            type="default"
            onClick={() => setCollapsed(!collapsed)}
            size={"large"}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
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