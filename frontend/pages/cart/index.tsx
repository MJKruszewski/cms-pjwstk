import {PcConfigurationDto} from '@frontendDto/configuration.dto';
import {postPayment, request} from '@frontendSrc/cart/slice';
import {GenericState} from '@frontendStore/genericDataSlice';
import {RootState, useAppDispatch} from '@frontendStore/rootStore';
import React, {FC, useEffect, useState} from 'react'
import {PayPalButton} from 'react-paypal-button-v2';
import randomColor from 'randomcolor';
import {useSelector} from 'react-redux';
import {Alert, Table, Tag, Typography} from "antd";
import {Product} from "@frontendDto/product.dto";
import {useRouter} from "next/router";

const { Paragraph, Text } = Typography;

const Cart: FC = () => {
  const { data, status, error } = useSelector<RootState, GenericState<PcConfigurationDto>>(state => state.cart);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [tagsPallete, setTagsPallete] = useState<Record<string, string>>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0.00);

  let configurationId = '50a59999-3092-4850-bd46-4ccf6d3875a8';

  if (router.query.configurationId) {
      if(Array.isArray(router.query.configurationId)) {
        configurationId = router.query.configurationId.pop();
      } else {
        configurationId = router.query.configurationId;
      }
  }

  useEffect(() => {
    dispatch(request(configurationId))
  }, []);

  const onSuccess = (details, paymentData) => {
    dispatch(postPayment({
      email: details.payer.email_address,
      orderId: paymentData.orderID,
      //todo PAWELEK NAPRAW やめてください
      configurations: [data]
    }));

    router.push('/success-page');
  };
  const createColorPalleteForTags = (dataToSplit: Product[]) => {
    let newPallete: Record<string, string> = {};
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
    if (!data || !data.components) {
      return;
    }
    setProducts(data.components);

    let total = 0;
    data.components.forEach((product) => {
      total += parseFloat(product.price.base);
    });

    setTotalAmount(total);

    createColorPalleteForTags(data.components)
  }, [data]);

  const onCancel = (data) => {
    console.log('The payment was cancelled!', data);
  };
  const onError = (err) => {
    console.log("Error!", err);
  };
  const currency = 'USD';

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
      <Alert message="Remember, adding product to cart does not means it is reserved for you!" type="info" style={{marginBottom: '25px'}}/>
      <Table
          pagination={false}
          columns={columns}
          dataSource={products}
          loading={status === 'loading'}
          scroll={{ y: 250 }}
          title={() => <b>Cart</b>}
          footer={() => <div style={{display: 'inline'}}>Total price: <b>{totalAmount.toFixed(2) + ' PLN'}</b></div> }
      />

      {/* <PaypalExpressBtn client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} /> */}
      <div style={{width: '50%', margin: '0 auto', marginTop: '60px'}}>
        <PayPalButton
            amount={totalAmount}
            currency={currency}
            // shippingPreference="SET_PROVIDED_ADDRESS" // default is "GET_FROM_FILE"
            onSuccess={onSuccess}
            onError={onError}
        />
      </div>
    </div>
  )
};

export default Cart
