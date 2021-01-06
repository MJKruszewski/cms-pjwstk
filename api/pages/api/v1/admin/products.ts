import {NextApiRequest, NextApiResponse} from "next";
import ProductsRepository from "@apiRepository/products.repository";
import {getPagination} from "@apiMiddleware/pagination.middleware";
import {mapMongoId} from "@apiMiddleware/mongo.middleware";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'OPTIONS') return res.status(200).json({});

    const productsRepository: ProductsRepository = await ProductsRepository.build();

    const products = await productsRepository.findAll(getPagination(req));
    res.setHeader('Content-Range', await productsRepository.count());
    res.status(200).json(products.map(mapMongoId))
}