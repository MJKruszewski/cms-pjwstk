import React, { FC, Fragment, useEffect, useState } from "react";
import { Checkbox, Select } from "antd";
import { RootState, useAppDispatch } from "@frontendStore/rootStore";
import { GenericState } from "@frontendStore/genericDataSlice";
import { useSelector } from 'react-redux';
import { ShippingMethod } from "@frontendDto/shipping-method.dto";
import { request } from "@frontendSrc/shipping-methods/slice";

const styles = {
    margin: '4em',
};

interface OnChangeHandler {
    (e): void;
}

interface MyInputProps {
    onSubmit: OnChangeHandler;
}

export const ShippingMethods: FC<MyInputProps> = ({ onSubmit }: MyInputProps) => {

    const { data, status, error } = useSelector<RootState, GenericState<ShippingMethod[]>>(state => state.shippingMethods);
    const dispatch = useAppDispatch();
    const [shippingMethod, setShippingMethod] = useState<ShippingMethod>(null)

    useEffect(() => {
        dispatch(request());
    }, [])

    useEffect(() => {
        if (shippingMethod || !data) {
            return;
        }
        setShippingMethod(data.find((method: ShippingMethod) => method.name === 'DHL'))
    }, [data])

    const onChange = (name: string) => {
        if (!data) {
            return;
        }
        const method = data.find(shippingMethod => shippingMethod.name === name);

        setShippingMethod(method)
    };

    return (
        <div style={styles}>
            <h1>Sposób dostawy</h1>
            <Select
                style={{ width: '100%' }}
                defaultValue={'DHL'}
                onChange={onChange}>
                {getOptions(data)}
            </Select>
            {
                shippingMethod && (
                    <Fragment>
                        <h1 style={{ margin: '4em, 0' }}>Cena Wysyłki: {shippingMethod.price}</h1>
                        <img height='200px' src={shippingMethod.cover} />
                    </Fragment>
                )
            }
        </div>
    );
}

function getOptions(shippingMethods: ShippingMethod[]) {

    const shippingNames = (shippingMethods === undefined) ? []
        : shippingMethods.map(shippingMethod => shippingMethod.name);

    return shippingNames.map(item => (
        <Select.Option key={item} value={item}>
            {item}
        </Select.Option>
    ))
}
