import { NextApiRequest, NextApiResponse } from 'next';
import ProductsRepository from '@apiRepository/products.repository';
import { getPagination } from '@apiMiddleware/pagination.middleware';
import { mapMongoId } from '@apiMiddleware/mongo.middleware';
import { Types } from 'mongoose';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'OPTIONS') return res.status(200).json({});

  const productsRepository: ProductsRepository = await ProductsRepository.build();

  // @ts-ignore
  const filter: { id: string[] } = JSON.parse(req.query.filter);

  if (req.query.filter && filter.id) {
    const ids = filter.id.map(item => Types.ObjectId(item));
    const newVar = await productsRepository.findByFilter({ _id: { $in: ids } });
    res.status(200).json(await newVar.map(mapMongoId));

    return;
  }

  const products = await productsRepository.findAll(getPagination(req));
  res.setHeader('Content-Range', await productsRepository.count());
  res.status(200).json(products.map(mapMongoId));
};
