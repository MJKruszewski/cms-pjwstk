import { NextApiRequest, NextApiResponse } from 'next';
import { Types } from 'mongoose';
import { mapMongoId } from '@apiMiddleware/mongo.middleware';
import ShippingMethodsRepository from '@apiRepository/shipping-methods.repository';
import NewsRepository from "@apiRepository/news.repository";
import {News} from "@apiDomain/news.domain";
import {ShippingMethod} from "@apiDomain/shipping-method.domain";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'OPTIONS') return res.status(200).json({});

  const shippingMethodsRepository: ShippingMethodsRepository = await ShippingMethodsRepository.build();

  if (req.method === 'GET') {
    await get(req, res, shippingMethodsRepository);
  } else if (req.method === 'PUT') {
    await put(req, res, shippingMethodsRepository);
  } else {
    res.status(405).json({ code: 'not-supported' });
  }
};

const get = async (req: NextApiRequest, res: NextApiResponse, shippingMethodsRepository: ShippingMethodsRepository) => {
  const { id } = req.query;

  if (id === undefined) {
    res.status(404).json({ code: 'not-found' });

    return;
  }

  const newVar = await shippingMethodsRepository.findOne(Types.ObjectId(typeof id === 'string' ? id : id.pop()));
  res.status(200).json(await mapMongoId(newVar));
};

const put = async (req: NextApiRequest, res: NextApiResponse, shippingMethodsRepository: ShippingMethodsRepository) => {
  const shippingMethod: ShippingMethod = req.body;
  // @ts-ignore
  const id = Types.ObjectId(shippingMethod.id);
  // @ts-ignore
  delete shippingMethod.id;

  const result = await shippingMethodsRepository.putOne(id, shippingMethod);

  res.status(201).json(mapMongoId(result.value));
};