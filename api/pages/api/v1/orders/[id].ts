import {NextApiRequest, NextApiResponse} from "next";
import PcConfigurationsRepository from "@apiRepository/pc-configurations.repository";
import {PcConfigurationDto} from "@apiDomain/configuration.domain";
import {WithId} from "mongodb";
import ProductsRepository from "@apiRepository/products.repository";
import OrderRepository from "@apiRepository/order.repository";
import {OrderDto} from "@apiDomain/order.domain";
import {Types} from "mongoose";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const configurationRepository: PcConfigurationsRepository = await PcConfigurationsRepository.build();
    const orderRepository: OrderRepository = await OrderRepository.build();
    const productsRepository: ProductsRepository = await ProductsRepository.build();

    if (req.method === 'GET') {
        await get(req, res, orderRepository, configurationRepository, productsRepository);
    } else {
        res.status(405).json({code: 'not-supported'});
    }
}

const get = async (req: NextApiRequest, res: NextApiResponse, orderRepository: OrderRepository, configurationRepository: PcConfigurationsRepository, productsRepository: ProductsRepository) => {
    const {id} = req.query;

    if (id === undefined) {
        res.status(404).json({code: 'not-found'});

        return;
    }

    const order = await orderRepository.findOne(Types.ObjectId(typeof id === 'string' ? id : id.pop()));
    let configurations: WithId<PcConfigurationDto>[] = [];

    for (const item of order.configurations) {
        let configuration = await configurationRepository.findOne(Types.ObjectId(item));
        let components = [];

        for (const item of configuration.components) {
            components.push(await productsRepository.findOne(Types.ObjectId(item)));
        }

        components = components.filter((item) => {
            return item !== undefined && item !== null;
        });
        configurations.push({
            _id: configuration._id,
            externalId: configuration.externalId,
            components: components,
        });
    }

    configurations = configurations.filter((item) => {
        return item !== undefined && item !== null;
    });

    const response: WithId<OrderDto> = {
        _id: order._id,
        orderId: order.externalOrder.id,
        configurations: configurations,
        email: order.email,
    };

    res.status(200).json(response)
};