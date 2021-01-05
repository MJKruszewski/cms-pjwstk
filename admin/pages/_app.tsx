import React, {Fragment, FunctionComponent} from 'react';
import {AppProps} from 'next/app';


const _App: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
      <Component {...pageProps} />
  );
};

export default _App;
