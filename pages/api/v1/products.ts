import {NextApiRequest, NextApiResponse} from "next";
// import ProductsRepository from "@repository/products.repository";
import {PaypalRepository} from "@repository/paypal.repository";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // const productsRepository: ProductsRepository = await ProductsRepository.build();

    res.status(200).json(await (await PaypalRepository.build()).getPayment('PAYID-L7L26GQ34E773272A787224P'))
}