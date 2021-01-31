import { NextApiRequest, NextApiResponse } from 'next';
import ProductsRepository from '@apiRepository/products.repository';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'OPTIONS') return res.status(200).json({});

  const productsRepository: ProductsRepository = await ProductsRepository.build();

  res.status(200).json(await productsRepository.findAll());
};
