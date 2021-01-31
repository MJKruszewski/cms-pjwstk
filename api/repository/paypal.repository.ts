import { client } from '@apiService/paypal.client';
import { OrderDetails, PaymentDetails } from '@apiDomain/order.domain';
import * as paypalTypes from 'onpaypal__checkout-server-sdk';

const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

export class PaypalRepository {
  constructor (
        private readonly paypalClient: paypalTypes.core.PayPalHttpClient
  ) {
  }

  static async build (): Promise<PaypalRepository> {
    return new PaypalRepository(client());
  }

  async getOrder (orderId: string): Promise<{result: OrderDetails & PaymentDetails}> {
    const request = new checkoutNodeJssdk.orders.OrdersGetRequest(orderId);

    return this.paypalClient.execute(request);
  }
}
