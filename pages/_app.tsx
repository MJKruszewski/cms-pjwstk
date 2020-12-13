import React, {Fragment, FunctionComponent} from 'react';
import {AppProps} from 'next/app';
import {Layout} from 'antd';
import SiderMenu from 'src/commons/sider-menu';

import 'antd/dist/antd.dark.css';
import {wrapper} from 'store/rootStore';

const _App: FunctionComponent<AppProps> = ({Component, pageProps}) => {
    return (
        <Fragment>
            <Layout style={{minHeight: '100vh'}}>
                <SiderMenu/>
                <Layout style={{padding: '24px'}}>
                    <Component {...pageProps} />
                </Layout>
            </Layout>
        </Fragment>
    );
};

export default wrapper.withRedux(_App);
