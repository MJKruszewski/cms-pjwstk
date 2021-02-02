import { NextApiRequest, NextApiResponse } from 'next';
import { Types } from 'mongoose';
import NewsRepository from '@apiRepository/news.repository';
import { mapMongoId } from '@apiMiddleware/mongo.middleware';
import {News} from "@apiDomain/news.domain";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'OPTIONS') return res.status(200).json({});

  const newsRepository: NewsRepository = await NewsRepository.build();

  if (req.method === 'GET') {
    await get(req, res, newsRepository);
  } else if (req.method === 'PUT') {
    await put(req, res, newsRepository);
  } else if (req.method === 'DELETE') {
    await deletes(req, res, newsRepository);
  } else {
    res.status(405).json({ code: 'not-supported' });
  }
};

const get = async (req: NextApiRequest, res: NextApiResponse, newsRepository: NewsRepository) => {
  const { id } = req.query;

  if (id === undefined) {
    res.status(404).json({ code: 'not-found' });

    return;
  }

  const newVar = await newsRepository.findOne(Types.ObjectId(typeof id === 'string' ? id : id.pop()));
  res.status(200).json(await mapMongoId(newVar));
};

const put = async (req: NextApiRequest, res: NextApiResponse, newsRepository: NewsRepository) => {
  const news: News = req.body;
  news.createdAt = new Date(news.createdAt);
  // @ts-ignore
  const id = Types.ObjectId(news.id);
  // @ts-ignore
  delete news.id;

  const result = await newsRepository.putOne(id, news);

  res.status(201).json(mapMongoId(result.value));
};

const deletes = async (req: NextApiRequest, res: NextApiResponse, newsRepository: NewsRepository) => {
  const { id } = req.query;
  // @ts-ignore
  const idt = Types.ObjectId(id);


  const result = await newsRepository.deleteOne(idt);

  res.status(204).json(result);
};
