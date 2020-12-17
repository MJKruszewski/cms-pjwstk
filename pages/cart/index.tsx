import { PcConfiguration } from '@domain/configuration.domain';
import { request, postPayment } from '@src/cart/slice';
import { GenericState } from '@store/genericDataSlice';
import { RootState, useAppDispatch } from '@store/rootStore';
import React, { FC, useEffect } from 'react'
import {PayPalButton, PaypalOptions} from 'react-paypal-button-v2';

import { useSelector } from 'react-redux';

const Cart: FC = () => {
  const { data, status, error } = useSelector<RootState, GenericState<PcConfiguration>>(state => state.cart);
  const dispatch = useAppDispatch();

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

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto'
    }}>
      <script src={url} />

      {/* <PaypalExpressBtn client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} /> */}
      <PayPalButton
        amount={total}
        currency={currency}
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={onSuccess}
        onError={onError}
      />
    </div>
  )
}

export default Cart
