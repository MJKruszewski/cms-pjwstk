import {NextApiRequest, NextApiResponse} from "next";
import NewsRepository from "@apiRepository/news.repository";
import {getPagination} from "@apiMiddleware/pagination.middleware";
import {mapMongoId} from "@apiMiddleware/mongo.middleware";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'OPTIONS') return res.status(200).json({});

    const newsRepository: NewsRepository = await NewsRepository.build();

    if (req.method === 'POST') {
        res.status(405).json({code: 'not-supported'});
    } else if (req.method === 'GET') {
        await get(req, res, newsRepository);
    } else {
        res.status(405).json({code: 'not-supported'});
    }
}

const get = async (req: NextApiRequest, res: NextApiResponse, newsRepository: NewsRepository) => {
    const news = await newsRepository.findAll(getPagination(req));
    res.setHeader('Content-Range', await newsRepository.count());

    res.status(200).json(await news.map(mapMongoId))
};