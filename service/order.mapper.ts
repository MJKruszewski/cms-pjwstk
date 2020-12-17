import {Order, OrderDetails, OrderDto, PaymentDetails} from "@domain/order.domain";

export class OrderMapper {
    static map(order: OrderDto, payment: OrderDetails & PaymentDetails): Order {
        const ids = [];

        order.configurations.forEach((item) => {
            ids.push(item._id);
        });

        return {
            email: order.email,
            externalOrder: payment,
            configurations: ids,
        };
    }
}