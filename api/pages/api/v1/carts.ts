import {NextApiRequest, NextApiResponse} from "next";
import PcConfigurationsRepository from "@apiRepository/pc-configurations.repository";
import {PcConfigurationDto} from "@apiDomain/configuration.domain";
import {ConfigurationMapper} from "@apiService/configuration.mapper";
import {CartDto} from "@apiDomain/cart.domain";
import CartsRepository from "@apiRepository/carts.repository";
import {CartMapper} from "@apiService/cart.mapper";

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
    res.status(200).json(await cartsRepository.findAll())
};