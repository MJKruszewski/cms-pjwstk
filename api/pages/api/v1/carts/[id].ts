import {NextApiRequest, NextApiResponse} from "next";
import PcConfigurationsRepository from "@apiRepository/pc-configurations.repository";
import {PcConfigurationDto} from "@apiDomain/configuration.domain";
import {ConfigurationMapper} from "@apiService/configuration.mapper";
import {WithId} from "mongodb";
import ProductsRepository from "@apiRepository/products.repository";
import {Types} from "mongoose";
import CartsRepository from "@apiRepository/carts.repository";
import {CartDto} from "@apiDomain/cart.domain";
import {Product} from "@apiDomain/product.domain";
import {CartMapper} from "@apiService/cart.mapper";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'OPTIONS') return res.status(200).json({});

    const cartsRepository: CartsRepository = await CartsRepository.build();
    const productsRepository: ProductsRepository = await ProductsRepository.build();
    const configurationRepository: PcConfigurationsRepository = await PcConfigurationsRepository.build();

    if (req.method === 'PUT') {
        await put(req, res, cartsRepository);
    } else if (req.method === 'GET') {
        await get(req, res, cartsRepository, productsRepository, configurationRepository);
    } else {
        res.status(405).json({code: 'not-supported'});
    }
}

const put = async (req: NextApiRequest, res: NextApiResponse, cartsRepository: CartsRepository) => {
    const {id} = req.query;

    if (id === undefined) {
        res.status(404).json({code: 'not-found'});

        return;
    }

    const cartDto: CartDto = req.body;
    const result = await cartsRepository.replaceOne(cartDto.externalId, CartMapper.map(cartDto));

    res.status(200).json(await cartsRepository.findOneByExternalId(typeof id === 'string' ? id : id.pop()));
};
const get = async (req: NextApiRequest, res: NextApiResponse, cartsRepository: CartsRepository, productsRepository: ProductsRepository, configurationRepository: PcConfigurationsRepository) => {
    const {id} = req.query;
    const products: WithId<Product>[] = [];
    const configurations: WithId<PcConfigurationDto>[] = [];

    if (id === undefined) {
        res.status(404).json({code: 'not-found'});

        return;
    }

    const cart = await cartsRepository.findOneByExternalId(typeof id === 'string' ? id : id.pop());

    if (cart === null) {
        res.status(404).json({code: 'not-found'});

        return;
    }

    for (const tmpId of cart.productIds) {
        const items = await productsRepository.findOne(Types.ObjectId(tmpId));

        if(items === null) {
            continue;
        }

        products.push(items)
    }
    for (const tmpId of cart.configurationIds) {
        const configuration = await configurationRepository.findOne(Types.ObjectId(tmpId));

        if (configuration === null) {
            continue;
        }

        let components = [];

        for (const item of configuration.components) {
            components.push(await productsRepository.findOne(Types.ObjectId(item)));
        }

        components = components.filter((item) => {
            return item !== undefined && item !== null;
        });

        configurations.push({
            components: components,
            externalId: configuration.externalId,
            _id: configuration._id,
        })
    }

    const response: WithId<CartDto> = {
        _id: cart._id,
        externalId: cart.externalId,
        configurations: configurations,
        products: products,
    };

    res.status(200).json(response)
};