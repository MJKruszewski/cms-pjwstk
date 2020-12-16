import { PcConfiguration } from '@domain/configuration.domain';
import { request, postPayment } from '@src/cart/slice';
import { GenericState } from '@store/genericDataSlice';
import { RootState, useAppDispatch } from '@store/rootStore';
import React, { FC, useEffect } from 'react'
import { PayPalButton } from 'react-paypal-button-v2';

import { useSelector } from 'react-redux';

const Cart: FC = () => {
  const { data, status, error } = useSelector<RootState, GenericState<PcConfiguration>>(state => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(request('65a56281-87c2-4e11-bce2-e6ff6621474b'))
  }, []);

  const client = {
    sandbox: 'Ab5D6N705DjZlueiajxmh3jWYoxRTRozHPo0BO8CTu3q1ojliJo22u62GxVKdIhPN9T41DLk6ySS_LLf',
  };
  const onSuccess = (details, paymentData) => {
    console.log(details, paymentData)

    // // OPTIONAL: Call your server to save the transaction
    dispatch(postPayment({
      email: details.payer.email_address,
      paymentId: details.id,
      configurations: data
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

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto'
    }}>
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
