import {NextApiRequest, NextApiResponse} from "next";
import {Types} from "mongoose";
import NewsRepository from "@apiRepository/news.repository";
import {mapMongoId} from "@apiMiddleware/mongo.middleware";
import ProductsRepository from "@apiRepository/products.repository";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'OPTIONS') return res.status(200).json({});

    const productsRepository: ProductsRepository = await ProductsRepository.build();

    if (req.method === 'GET') {
        await get(req, res, productsRepository);
    } else {
        res.status(405).json({code: 'not-supported'});
    }
}

const get = async (req: NextApiRequest, res: NextApiResponse, productsRepository: ProductsRepository) => {
    const {id} = req.query;

    if (id === undefined) {
        res.status(404).json({code: 'not-found'});

        return;
    }

    const newVar = await productsRepository.findOne(Types.ObjectId(typeof id === 'string' ? id : id.pop()));
    res.status(200).json(await mapMongoId(newVar));
};