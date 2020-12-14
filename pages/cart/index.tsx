import React, {FC, useEffect} from 'react'
import PaypalExpressBtn from 'react-paypal-express-checkout';


const Cart: FC = () => {
    useEffect(function onFirstMount() {
        // dispatch(request())
    }, []);

    const client = {
        sandbox: 'Ab5D6N705DjZlueiajxmh3jWYoxRTRozHPo0BO8CTu3q1ojliJo22u62GxVKdIhPN9T41DLk6ySS_LLf',
    };
    const onSuccess = (payment) => {
        //TODO post na ordersy z idikiem paymentId
        console.log("The payment was succeeded!", payment);
    };
    const onCancel = (data) => {
        console.log('The payment was cancelled!', data);
    };
    const onError = (err) => {
        console.log("Error!", err);
    };
    const currency = 'PLN';
    const total = 69.99;

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto'
        }}>
            <PaypalExpressBtn client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
        </div>
    )
}

export default Cart
