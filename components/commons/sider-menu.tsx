import { HomeFilled } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useRouter } from 'next/dist/client/router';
import React, { CSSProperties, FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { MenuInfo } from 'rc-menu/lib/interface';

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
    icon: <HomeFilled />,
    content: 'Home'
  }
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
