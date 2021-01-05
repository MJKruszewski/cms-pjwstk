import {NextApiRequest, NextApiResponse} from "next";
import ProductsRepository from "@apiRepository/products.repository";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const productsRepository: ProductsRepository = await ProductsRepository.build();

    res.status(200).json(await productsRepository.findAll())
}