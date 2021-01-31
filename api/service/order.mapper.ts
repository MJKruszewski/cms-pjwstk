import { Order, OrderDetails, OrderDto, PaymentDetails } from '@apiDomain/order.domain';

export class OrderMapper {
  static map (order: OrderDto, payment: OrderDetails & PaymentDetails): Order {
    const ids = [];

    order.configurations.forEach((item) => {
      ids.push(item._id);
    });

    return {
      user: order.user,
      shippingMethod: order.shippingMethod,
      externalOrder: payment,
      configurations: ids
    };
  }
}
