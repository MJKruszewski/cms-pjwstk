import * as React from "react";
import {Admin, ListGuesser, Resource, ShowGuesser} from 'react-admin';
import {createHashHistory} from 'history';
import simpleRestProvider from 'ra-data-simple-rest';
import { AuthProvider } from 'react-admin';

const authProvider: AuthProvider = {
    checkAuth(params: any): Promise<void> {
        const promise: Promise<void> = new Promise((resolve, reject) => {
            const auth = localStorage.getItem('auth');

            if (auth === '' || auth === undefined || auth === null) {
                reject()
            }

            resolve()
        })

        return promise;
    }, checkError(error: any): Promise<void> {
        return Promise.resolve(undefined);
    }, getPermissions(params: any): Promise<any> {
        return Promise.resolve(undefined);
    }, login({ username, password }): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = new Request(`${process.env.API_HOST}/api/v1/admin/auth`, {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: new Headers({ 'Content-Type': 'application/json' }),
            });

            fetch(request)
                .then(response => {
                    if (response.status < 200 || response.status >= 300) {
                        reject();
                    }
                    localStorage.setItem('auth', JSON.stringify(response.json()));

                    resolve();
                })
                .catch(() => {
                    reject();
                });
        });
    }, logout(params: any): Promise<void | false | string> {
        localStorage.removeItem('auth');

        return Promise.resolve('login');
    }
}

const history = createHashHistory();

const App = () => <Admin authProvider={authProvider} dataProvider={simpleRestProvider(`${process.env.API_HOST}/api/v1/admin`)} history={history}>
    <Resource name="news" list={ListGuesser} edit={ShowGuesser}/>
    <Resource name="orders" list={ListGuesser}/>
    <Resource name="carts" list={ListGuesser} edit={ShowGuesser}/>
    <Resource name="products" list={ListGuesser} edit={ShowGuesser}/>
    <Resource name="configurations" list={ListGuesser} edit={ShowGuesser}/>
    <Resource name="shipping-methods" list={ListGuesser} edit={ShowGuesser}/>
</Admin>;

export default App;