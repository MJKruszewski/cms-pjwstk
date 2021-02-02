import { NextApiRequest, NextApiResponse } from 'next';
import NewsRepository from '@apiRepository/news.repository';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'OPTIONS') return res.status(200).json({});

  const newsRepository: NewsRepository = await NewsRepository.build();

  if (req.method === 'POST') {
    res.status(405).json({ code: 'not-supported' });
  } else if (req.method === 'GET') {
    await get(req, res, newsRepository);
  } else {
    res.status(405).json({ code: 'not-supported' });
  }
};

const get = async (req: NextApiRequest, res: NextApiResponse, newsRepository: NewsRepository) => {
  res.status(200).json(await newsRepository.findAll({sort: {order: -1}}));
};
