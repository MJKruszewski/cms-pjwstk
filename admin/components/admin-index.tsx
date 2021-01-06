import * as React from "react";
import {Admin, Resource, ListGuesser} from 'react-admin';
import {DataProvider, Identifier, GetListResult, Record, CreateParams, DeleteParams, GetListParams, UpdateResult, DeleteManyParams, GetManyParams, CreateResult, GetOneResult, DeleteResult, GetManyReferenceParams, GetOneParams, UpdateParams, UpdateManyParams} from 'ra-core';
import { createHashHistory } from 'history';
import simpleRestProvider from 'ra-data-simple-rest';

const dataProvider: DataProvider = {
    create: async <RecordType extends Record = Record>(p1: string, p2: CreateParams): Promise<CreateResult<RecordType>> => ({
        data: null,
    }),
    delete: async <RecordType extends Record = Record>(p1: string, p2: DeleteParams):Promise<DeleteResult<RecordType>> => ({
        data: null,
    }),
    deleteMany: async (p1: string, p2: DeleteManyParams) => ({
        data: [],
        total: 0,
    }),
    getMany: async (p1: string, p2: GetManyParams) => ({
        data: [],
        total: 0,
    }),
    getManyReference: async (p1: string, p2: GetManyReferenceParams) => ({
        data: [],
        total: 0,
    }),
    getOne: async <RecordType extends Record = Record>(p1: string, p2: GetOneParams): Promise<GetOneResult<RecordType>> => ({
        // @ts-ignore
        data: {
            id: 'idas',
        },
    }),
    update: async <RecordType extends Record = Record>(p1: string, p2: UpdateParams): Promise<UpdateResult<RecordType>> => ({
        // @ts-ignore
        data: {
            id: 'id',
        },
    }),
    updateMany: async (p1: string, p2: UpdateManyParams) => ({
        data: [],
        total: 0,
    }),
    getList: async <RecordType extends Record = Record>(resource: string, params: GetListParams): Promise<GetListResult<RecordType>> => {
        return {
            // @ts-ignore
            data: [{id: 1}],
            total: 0,
        };
    }
};
const history = createHashHistory();

const App = () => <Admin dataProvider={simpleRestProvider(`${process.env.API_HOST}/api/v1/admin`)} history={history}>
    <Resource name="news" list={ListGuesser} />
    <Resource name="orders" list={ListGuesser} />
    <Resource name="products" list={ListGuesser} />
    <Resource name="configurations" list={ListGuesser} />
</Admin>;

export default App;