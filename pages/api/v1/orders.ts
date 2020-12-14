import {NextApiRequest, NextApiResponse} from "next";
import OrderRepository from "@repository/order.repository";
import {OrderMapper} from "@service/order.mapper";
import {OrderDto} from "@domain/order.domain";
import {PaypalRepository} from "@repository/paypal.repository";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const orderRepository: OrderRepository = await OrderRepository.build();
    const paypalRepository: PaypalRepository = await PaypalRepository.build();

    if (req.method === 'POST') {
        await post(req, res, orderRepository, paypalRepository);
    } else {
        res.status(405).json({code: 'not-supported'});
    }
}

const post = async (req: NextApiRequest, res: NextApiResponse, orderRepository: OrderRepository, paypalRepository: PaypalRepository) => {
    const order: OrderDto = req.body;
    const payment = await paypalRepository.getPayment(order.paymentId);
    const result = await orderRepository.insertOne(OrderMapper.map(order, payment));

    //TODO - logic for decrementing products amount when payment is completed

    res.status(201).json(result.ops.pop());
};