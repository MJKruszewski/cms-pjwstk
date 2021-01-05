import {NextApiRequest, NextApiResponse} from "next";
import ProductsRepository from "@apiRepository/products.repository";
import {ProductTypeEnum} from "@apiDomain/product.domain";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const productsRepository: ProductsRepository = await ProductsRepository.build();

    if (req.method === 'PUT') {
        res.status(405).json({code: 'not-supported'});
    } else if (req.method === 'POST') {
        res.status(405).json({code: 'not-supported'});
    } else if (req.method === 'GET') {
        await get(req, res, productsRepository);
    } else {
        res.status(405).json({code: 'not-supported'});
    }
}

const get = async (req: NextApiRequest, res: NextApiResponse, productsRepository: ProductsRepository) => {
    let {category} = req.query;

    if (category === undefined) {
        res.status(404).json({code: 'not-found'});

        return;
    }

    category = typeof category === 'string' ? category : category.pop();

    const products = await productsRepository.findByTypeAndPromoted(ProductTypeEnum[category.toUpperCase()], true);

    res.status(200).json(await products.toArray())
};