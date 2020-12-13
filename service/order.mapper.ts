import {Order, OrderDto} from "@domain/order.domain";

export class OrderMapper {
    static map(order: OrderDto): Order {
        const ids = [];

        order.configurations.forEach((item) => {
            ids.push(item._id);
        });

        return {
            email: order.email,
            configurations: ids,
        };
    }
}