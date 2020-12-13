import {Button} from 'antd';
import React, {FC, useEffect} from 'react'

import {useSelector} from 'react-redux';
import {request} from 'src/products/slice';
import {GenericState} from 'store/genericDataSlice';
import {RootState, useAppDispatch} from 'store/rootStore';

const Products: FC = () => {
    const {data, status} = useSelector<RootState, GenericState<number>>(state => state.products);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // dispatch(request())
    }, [])

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto'
        }}>
            PRODUCTS
            <Button onClick={() => dispatch(request())}>Load</Button>
            <span>Status: {JSON.stringify(status)}</span>
            <span>Products: {JSON.stringify(data, null, 4)}</span>
        </div>
    )
}

export default Products
