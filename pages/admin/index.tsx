import * as React from "react";
import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('../../src/components/admin-index'), {
    ssr: false
});

const App = () => <DynamicComponentWithNoSSR />;

export default App;