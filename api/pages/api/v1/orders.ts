import {NextApiRequest, NextApiResponse} from "next";
import OrderRepository from "@apiRepository/order.repository";
import {OrderMapper} from "@apiService/order.mapper";
import {OrderDto} from "@apiDomain/order.domain";
import {PaypalRepository} from "@apiRepository/paypal.repository";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'OPTIONS') return res.status(200).json({});

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
    // const externalOrder = await paypalRepository.getOrder(order.orderId);
    // const result = await orderRepository.insertOne(OrderMapper.map(order, externalOrder));
    const result = await orderRepository.insertOne(OrderMapper.map(order, null));

    //TODO - logic for decrementing products amount when payment is completed

    res.status(201).json(result.ops.pop());
};