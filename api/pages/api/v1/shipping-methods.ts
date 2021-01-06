import {NextApiRequest, NextApiResponse} from "next";
import ShippingMethodsRepository from "@apiRepository/shipping-methods.repository";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'OPTIONS') return res.status(200).json({});

    const shippingMethodsRepository: ShippingMethodsRepository = await ShippingMethodsRepository.build();

    res.status(200).json(await shippingMethodsRepository.findAll())
}