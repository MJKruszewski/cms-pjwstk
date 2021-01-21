import React, {FC, Fragment, useEffect, useState} from "react";
import {Button, Card, Checkbox, Form, Select} from "antd";
import {RootState, useAppDispatch} from "@frontendStore/rootStore";
import {GenericState} from "@frontendStore/genericDataSlice";
import {useSelector} from 'react-redux';
import {ShippingMethod} from "@frontendDto/shipping-method.dto";
import {request} from "@frontendSrc/shipping-methods/slice";

const styles = {
    marginBottom: '5em',
    marginRight: '5em',
    marginTop: '5em',
    width: '30%',
};

interface OnChangeHandler {
    (e): void;
}

interface MyInputProps {
    onSubmit: OnChangeHandler;
}

export const ShippingMethods: FC<MyInputProps> = ({onSubmit}: MyInputProps) => {

    const {
        data,
        status,
        error
    } = useSelector<RootState, GenericState<ShippingMethod[]>>(state => state.shippingMethods);
    const dispatch = useAppDispatch();
    const [shippingMethod, setShippingMethod] = useState<ShippingMethod>(null)
    const [isDisabled, setIsDisabled] = useState<boolean>(false)

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

    const onFinish = (): void => {
        setIsDisabled(true);
        if (shippingMethod !== undefined) {
            onSubmit(shippingMethod);
            return
        }
    };

    return (
        <Card title={'Shipping method'}
              style={styles}>
            <div>
                <Select
                    style={{width: '100%'}}
                    defaultValue={'DHL'}
                    onChange={onChange}
                    disabled={isDisabled}>
                    {getOptions(data)}
                </Select>
                {
                    shippingMethod && (
                        <Fragment>
                            <div>
                                <img style={{marginTop: '1em'}} width='100px' src={shippingMethod.cover}/>
                            </div>
                            <h1 style={{
                                marginTop: '1em',
                            }}>{"Shipping price:"} {shippingMethod.price} {"PLN"}</h1>
                            <Button onClick={onFinish}
                                    style={{marginTop: '1em'}}
                                    type="primary">
                                Submit
                            </Button>
                        </Fragment>
                    )
                }
            </div>
        </Card>
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
