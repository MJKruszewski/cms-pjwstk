import * as React from "react";
import {Admin, ListGuesser, Resource} from 'react-admin';
import {createHashHistory} from 'history';
import simpleRestProvider from 'ra-data-simple-rest';

const history = createHashHistory();

const App = () => <Admin dataProvider={simpleRestProvider(`${process.env.API_HOST}/api/v1/admin`)} history={history}>
    <Resource name="news" list={ListGuesser} />
    <Resource name="orders" list={ListGuesser} />
    <Resource name="products" list={ListGuesser} />
    <Resource name="configurations" list={ListGuesser} />
</Admin>;

export default App;