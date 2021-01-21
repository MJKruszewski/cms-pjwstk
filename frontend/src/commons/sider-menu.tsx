import {BuildOutlined, DesktopOutlined, HomeOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import {Image, Menu} from 'antd';
import {useRouter} from 'next/dist/client/router';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {MenuInfo} from 'rc-menu/lib/interface';

const SiderMenu: FunctionComponent = () => {
    const router = useRouter();
    const [selectedKeys, setSelectedKeys] = useState<string[]>([router.pathname]);

    const handleMenuItemClicked = ({key}: MenuInfo) => {
        router.push(String(key));
    };

    useEffect(() => {
        setSelectedKeys([router.pathname]);
    }, [router.pathname]);

    return (
        <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={selectedKeys}
            onSelect={handleMenuItemClicked}
        >
            <img src={'/logoqwe.png'} height={'46px'}/>
            {
                <Menu.Item
                    key='/'
                    style={{marginLeft: '30px'}}
                    icon={<HomeOutlined/>}
                >
                    {'Home'}
                </Menu.Item>
            }
            {
                <Menu.Item
                    key='/configurations/create'
                    style={{}}
                    icon={<DesktopOutlined />}
                >
                    {'Configure PC'}
                </Menu.Item>
            }
            {
                <Menu.Item
                    key='/cart'
                    style={{
                        fontWeight: 'bold',
                        float: 'right'
                    }}
                    icon={<ShoppingCartOutlined/>}
                >Cart</Menu.Item>
            }
        </Menu>
    );
};

export default SiderMenu;
