import React, { FC, Fragment, useEffect } from 'react';
import { Card, Select } from 'antd';
import { RootState, useAppDispatch } from '@frontendStore/rootStore';
import { GenericState } from '@frontendStore/genericDataSlice';
import { useSelector } from 'react-redux';
import { ShippingMethod } from '@frontendDto/shipping-method.dto';
import { request } from '@frontendSrc/shipping-methods/slice';

const styles = {
  marginBottom: '5em',
  marginRight: '5em',
  marginTop: '5em',
  width: '30%'
};

interface MyInputProps {
    shippingMethod: any;
    setShippingMethod: any;
}

export const ShippingMethods: FC<MyInputProps> = ({ shippingMethod, setShippingMethod }: MyInputProps) => {
  const {
    data,
    status,
    error
  } = useSelector<RootState, GenericState<ShippingMethod[]>>(state => state.shippingMethods);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(request());
  }, []);

  useEffect(() => {
    if (shippingMethod || !data) {
      return;
    }
    setShippingMethod(data.find((method: ShippingMethod) => method.name === 'DHL'));
  }, [data]);

  const onChange = (name: string) => {
    if (!data) {
      return;
    }
    const method = data.find(shippingMethod => shippingMethod.name === name);

    setShippingMethod(method);
  };

  return (
        <Card title={'Shipping method'}
              style={styles}>
            <div>
                <Select
                    style={{ width: '100%' }}
                    defaultValue={'DHL'}
                    onChange={onChange}>
                    {getOptions(data)}
                </Select>
                {
                    shippingMethod && (
                        <Fragment>
                            <div>
                                <img style={{ marginTop: '2em' }} height='50px' src={shippingMethod.cover}/>
                            </div>
                            <h1 style={{
                              marginTop: '1em'
                            }}>{'Shipping price:'} {shippingMethod.price} {'PLN'}</h1>
                        </Fragment>
                    )
                }
            </div>
        </Card>
  );
};

function getOptions (shippingMethods: ShippingMethod[]) {
  const shippingNames = (shippingMethods === undefined)
    ? []
    : shippingMethods.map(shippingMethod => shippingMethod.name);

  return shippingNames.map(item => (
        <Select.Option key={item} value={item}>
            {item}
        </Select.Option>
  ));
}
