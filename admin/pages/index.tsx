import * as React from "react";
import dynamic from 'next/dynamic'
import {FC} from "react";

const DynamicComponentWithNoSSR = dynamic(() => import('../components/admin-index'), {
    ssr: false
});

const App: FC = () => {
    return (<DynamicComponentWithNoSSR />)
};

export default App;