import {NextApiRequest, NextApiResponse} from "next";
import OrderRepository from "@repository/order.repository";
import {OrderMapper} from "@service/order.mapper";
import {OrderDto} from "@domain/order.domain";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const orderRepository: OrderRepository = await OrderRepository.build();

    if (req.method === 'POST') {
        await post(req, res, orderRepository);
    } else {
        res.status(405).json({code: 'not-supported'});
    }
}

const post = async (req: NextApiRequest, res: NextApiResponse, orderRepository: OrderRepository) => {
    const order: OrderDto = req.body;
    const result = await orderRepository.insertOne(OrderMapper.map(order));

    res.status(201).json(result.ops.pop());
};