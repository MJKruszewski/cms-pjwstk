import {NextApiRequest, NextApiResponse} from "next";
import ShippingMethodsRepository from "@apiRepository/shipping-methods.repository";
import {mapMongoId} from "@apiMiddleware/mongo.middleware";
import {getPagination} from "@apiMiddleware/pagination.middleware";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'OPTIONS') return res.status(200).json({});

    const shippingMethodsRepository: ShippingMethodsRepository = await ShippingMethodsRepository.build();

    const shippingMethods = await shippingMethodsRepository.findAll(getPagination(req));
    res.setHeader('Content-Range', await shippingMethodsRepository.count());
    res.status(200).json(shippingMethods.map(mapMongoId))
}