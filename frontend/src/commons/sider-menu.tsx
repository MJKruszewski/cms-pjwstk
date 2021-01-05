import {AppstoreOutlined, BuildOutlined, HomeOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import {Layout, Menu} from 'antd';
import {useRouter} from 'next/dist/client/router';
import React, {CSSProperties, FunctionComponent, ReactElement, useEffect, useState} from 'react';
import {MenuInfo} from 'rc-menu/lib/interface';

const { Sider } = Layout;

interface MenuConfigItem {
  key: string;
  icon?: ReactElement;
  style?: CSSProperties;
  content: string
}

const menuItemStyle: CSSProperties = {
  display: 'flex',
  alignContent: 'center',
  alignItems: 'center'
};

const menuConfig: MenuConfigItem[] = [
  {
    key: '/',
    icon: <HomeOutlined />,
    content: 'News'
  },
  {
    key: '/products',
    icon: <AppstoreOutlined />,
    content: 'Products'
  },
  {
    key: '/configurations/create',
    icon: <BuildOutlined />,
    content: 'New Configuration'
  },
  {
    key: '/cart',
    icon: <ShoppingCartOutlined />,
    content: 'Cart'
  },
];

const SiderMenu: FunctionComponent = () => {
  const router = useRouter();
  const [leftSiderCollapsed, setLeftSiderCollapsed] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([router.pathname]);

  const handleMenuItemClicked = ({ key }: MenuInfo) => {
    router.push(String(key));
  };

  useEffect(() => {
    setSelectedKeys([router.pathname]);
  }, [router.pathname]);

  return (
    <Sider
      collapsible
      collapsed={leftSiderCollapsed}
      onCollapse={() => setLeftSiderCollapsed(!leftSiderCollapsed)}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0
      }}
    >
      <Menu
        theme="dark"
        mode="inline"
        style={{ overflow: 'auto', height: '90vh' }}
        selectedKeys={selectedKeys}
        onSelect={handleMenuItemClicked}
      >
        {
          menuConfig.map((item) => (
            <Menu.Item
              key={item.key}
              style={{ ...menuItemStyle, ...item?.style }}
              icon={item.icon}
            >
              {item.content}
            </Menu.Item>
          ))
        }
      </Menu>
    </Sider>
  );
};

export default SiderMenu;
