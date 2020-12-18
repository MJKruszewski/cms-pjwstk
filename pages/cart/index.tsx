import {PcConfiguration, PcConfigurationDto} from '@domain/configuration.domain';
import { request, postPayment } from '@src/cart/slice';
import { GenericState } from '@store/genericDataSlice';
import { RootState, useAppDispatch } from '@store/rootStore';
import React, {FC, useEffect, useState} from 'react'
import {PayPalButton, PaypalOptions} from 'react-paypal-button-v2';
import randomColor from 'randomcolor';
import { useSelector } from 'react-redux';
import {Table, Tag, Typography} from "antd";
import {Product} from "@domain/product.domain";
const { Paragraph, Text } = Typography;

const Cart: FC = () => {
  const { data, status, error } = useSelector<RootState, GenericState<PcConfigurationDto>>(state => state.cart);
  const dispatch = useAppDispatch();

  const [tagsPallete, setTagsPallete] = useState<Record<string, string>>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [totalAmount, setTotalAmount] = useState<string>('0.00 PLN');

  useEffect(() => {
    dispatch(request('50a59999-3092-4850-bd46-4ccf6d3875a8'))
  }, []);

  const onSuccess = (details, paymentData) => {
    dispatch(postPayment({
      email: details.payer.email_address,
      orderId: paymentData.orderID,
      //todo PAWELEK NAPRAW やめてください
      configurations: [data]
    }))
  };
  const createColorPalleteForTags = (dataToSplit: Product[]) => {
    let newPallete: Record<string, string> = {}
    dataToSplit.forEach(product =>
        product.features.forEach(feature =>
            !newPallete[feature.value]
                ? newPallete[feature.value] = randomColor({ luminosity: 'dark' })
                : newPallete[feature.value] = newPallete[feature.value]
        )
    );

    setTagsPallete(newPallete)
  };

  useEffect(() => {
    if (!data) {
      return;
    }
    setProducts(data.components);

    let total = 0;
    data.components.forEach((product) => {
      total += parseFloat(product.price.base);
    });

    setTotalAmount(total.toFixed(2) + ' PLN');

    createColorPalleteForTags(data.components)
  }, [data])

  const onCancel = (data) => {
    console.log('The payment was cancelled!', data);
  };
  const onError = (err) => {
    console.log("Error!", err);
  };
  const currency = 'USD';
  const total = 6.99;
  const options: PaypalOptions = {
    clientId: process.env.PAYPAL_SANDBOX_CLIENT,
    intent: 'capture',
    commit: true,
    currency: 'PLN'
  };

  const url = "https://www.paypal.com/sdk/js?client-id=Ab5D6N705DjZlueiajxmh3jWYoxRTRozHPo0BO8CTu3q1ojliJo22u62GxVKdIhPN9T41DLk6ySS_LLf";
  const renderFeatures = (features: Product['features']) => {
    return features.map((feature, index) => (
        <Tag color={tagsPallete[feature.value] || randomColor()} key={`${feature.code}-${index}`}>
          <Text strong>
            {feature.value}
          </Text>
        </Tag>
    ))
  };
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Price', dataIndex: 'price', key: 'price', render: price => parseFloat(price.base).toFixed(2) + " PLN" },
    { title: 'Features', dataIndex: 'features', key: 'features', render: renderFeatures },
  ];


  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto'
    }}>
      <script src={url} />

      <Table
          pagination={false}
          columns={columns}
          dataSource={products}
          loading={status === 'loading'}
          scroll={{ y: 250 }}
          title={() => <b>Cart</b>}
          footer={() => <div style={{display: 'inline'}}>Total price: <b>{totalAmount}</b></div> }
      />

      {/* <PaypalExpressBtn client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} /> */}
      <div style={{width: '50%', margin: '0 auto', marginTop: '60px'}}>
        <PayPalButton
            amount={total}
            currency={currency}
            // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
            onSuccess={onSuccess}
            onError={onError}
        />
      </div>
    </div>
  )
}

export default Cart
