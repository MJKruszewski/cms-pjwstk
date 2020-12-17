import {NextApiRequest, NextApiResponse} from "next";
import PcConfigurationsRepository from "@repository/pc-configurations.repository";
import {PcConfigurationDto} from "@domain/configuration.domain";
import {ConfigurationMapper} from "@service/configuration.mapper";

export default async (req: NextApiRequest, res: NextApiResponse) => {
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
    res.status(200).json(await configurationRepository.findAll())
};