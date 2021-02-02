import {NextApiRequest, NextApiResponse} from 'next';
import ShippingMethodsRepository from '@apiRepository/shipping-methods.repository';
import {mapMongoId} from '@apiMiddleware/mongo.middleware';
import {getPagination} from '@apiMiddleware/pagination.middleware';
import {ShippingMethod} from "@apiDomain/shipping-method.domain";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'OPTIONS') return res.status(200).json({});

  const shippingMethodsRepository: ShippingMethodsRepository = await ShippingMethodsRepository.build();

  if (req.method === 'POST') {
    await post(req, res, shippingMethodsRepository);
  } else if (req.method === 'GET') {
    await get(req, res, shippingMethodsRepository);
  } else {
    res.status(405).json({ code: 'not-supported' });
  }
};

const get = async (req: NextApiRequest, res: NextApiResponse, shippingMethodsRepository: ShippingMethodsRepository) => {
  const shippingMethods = await shippingMethodsRepository.findAll(getPagination(req));
  res.setHeader('Content-Range', await shippingMethodsRepository.count());
  res.status(200).json(shippingMethods.map(mapMongoId));
};

const post = async (req: NextApiRequest, res: NextApiResponse, shippingMethodsRepository: ShippingMethodsRepository) => {
  const product: ShippingMethod = req.body;
  const result = await shippingMethodsRepository.insertOne(product);

  res.status(201).json(mapMongoId(result.ops.pop()));
};