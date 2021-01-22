import {NextApiRequest, NextApiResponse} from "next";
import PcConfigurationsRepository from "@apiRepository/pc-configurations.repository";
import {PcConfigurationDto} from "@apiDomain/configuration.domain";
import {ConfigurationMapper} from "@apiService/configuration.mapper";
import {CartDto} from "@apiDomain/cart.domain";
import CartsRepository from "@apiRepository/carts.repository";
import {CartMapper} from "@apiService/cart.mapper";
import {mapMongoId} from "@apiMiddleware/mongo.middleware";
import {Schema, Types} from "mongoose";
import {getPagination} from "@apiMiddleware/pagination.middleware";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'OPTIONS') return res.status(200).json({});

    const cartsRepository: CartsRepository = await CartsRepository.build();

    if (req.method === 'POST') {
        await post(req, res, cartsRepository);
    } else if (req.method === 'GET') {
        await get(req, res, cartsRepository);
    } else {
        res.status(405).json({code: 'not-supported'});
    }
}

const post = async (req: NextApiRequest, res: NextApiResponse, cartsRepository: CartsRepository) => {
    const cartDto: CartDto = req.body;
    const result = await cartsRepository.insertOne(CartMapper.map(cartDto));

    res.status(201).json(result.ops.pop());
};
const get = async (req: NextApiRequest, res: NextApiResponse, cartsRepository: CartsRepository) => {
    // @ts-ignore
    const filter: { id: string[] } = JSON.parse(req.query.filter);

    if (req.query.filter && filter.id) {
        const ids = filter.id.map(item => Types.ObjectId(item));
        const newVar = await cartsRepository.findByFilter({_id: {$in: ids}});
        res.status(200).json(await newVar.map(mapMongoId));

        return;
    }

    const carts = await cartsRepository.findAll(getPagination(req));
    res.setHeader('Content-Range', await cartsRepository.count());
    res.status(200).json(await carts.map(mapMongoId).map(item => {
        delete item.externalId

        return item;
    }))
};