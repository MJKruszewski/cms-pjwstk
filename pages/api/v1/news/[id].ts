import {NextApiRequest, NextApiResponse} from "next";
import PcConfigurationsRepository from "@repository/pc-configurations.repository";
import {PcConfigurationDto} from "@domain/configuration.domain";
import {WithId} from "mongodb";
import ProductsRepository from "@repository/products.repository";
import OrderRepository from "@repository/order.repository";
import {OrderDto} from "@domain/order.domain";
import {Types} from "mongoose";
import NewsRepository from "@repository/news.repository";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const newsRepository: NewsRepository = await NewsRepository.build();

    if (req.method === 'GET') {
        await get(req, res, newsRepository);
    } else {
        res.status(405).json({code: 'not-supported'});
    }
}

const get = async (req: NextApiRequest, res: NextApiResponse, newsRepository: NewsRepository) => {
    const {id} = req.query;

    if (id === undefined) {
        res.status(404).json({code: 'not-found'});

        return;
    }

    res.status(200).json(await newsRepository.findOne(Types.ObjectId(typeof id === 'string' ? id : id.pop())));
};