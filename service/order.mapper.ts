import {Order, OrderDto} from "@domain/order.domain";
import * as paypal from "paypal-rest-sdk";

export class OrderMapper {
    static map(order: OrderDto, payment: paypal.PaymentResponse): Order {
        const ids = [];

        order.configurations.forEach((item) => {
            ids.push(item._id);
        });

        return {
            email: order.email,
            payment: payment,
            configurations: ids,
        };
    }
}