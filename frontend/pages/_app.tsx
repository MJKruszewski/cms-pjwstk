import React, { Fragment, FunctionComponent } from 'react';
import { AppProps } from 'next/app';
import { Layout } from 'antd';
import SiderMenu from 'src/commons/sider-menu';
import { wrapper } from 'store/rootStore';
import 'antd/dist/antd.dark.css';
import { CookiesProvider } from 'react-cookie';

const _App: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <Fragment>
      <Layout style={{ minHeight: '100vh' }}>
        <SiderMenu />
        <Layout style={{ padding: '24px' }}>
            <CookiesProvider>
                <Component {...pageProps} />
            </CookiesProvider>
        </Layout>
      </Layout>
    </Fragment>
  );
};

export default wrapper.withRedux(_App);
