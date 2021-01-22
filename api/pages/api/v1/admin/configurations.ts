import {NextApiRequest, NextApiResponse} from "next";
import PcConfigurationsRepository from "@apiRepository/pc-configurations.repository";
import {PcConfigurationDto} from "@apiDomain/configuration.domain";
import {ConfigurationMapper} from "@apiService/configuration.mapper";
import {getPagination} from "@apiMiddleware/pagination.middleware";
import {mapMongoId} from "@apiMiddleware/mongo.middleware";
import {Types} from "mongoose";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'OPTIONS') return res.status(200).json({});

    const configurationRepository: PcConfigurationsRepository = await PcConfigurationsRepository.build();

    if (req.method === 'POST') {
        await post(req, res, configurationRepository);
    } else if (req.method === 'GET') {
        await get(req, res, configurationRepository);
    } else {
        res.status(405).json({code: 'not-supported'});
    }
}

const post = async (req: NextApiRequest, res: NextApiResponse, configurationRepository: PcConfigurationsRepository) => {
    const configuration: PcConfigurationDto = req.body;
    const result = await configurationRepository.insertOne(ConfigurationMapper.map(configuration));

    res.status(201).json(result.ops.pop());
};
const get = async (req: NextApiRequest, res: NextApiResponse, configurationRepository: PcConfigurationsRepository) => {
    // @ts-ignore
    const filter: { id: string[] } = JSON.parse(req.query.filter);

    if (req.query.filter && filter.id) {
        const ids = filter.id.map(item => Types.ObjectId(item));
        const newVar = await configurationRepository.findByFilter({_id: {$in: ids}});
        res.status(200).json(await newVar.map(mapMongoId));

        return;
    }

    const configurations = await configurationRepository.findAll(getPagination(req));
    res.setHeader('Content-Range', await configurationRepository.count());

    res.status(200).json(configurations.map(mapMongoId))
};