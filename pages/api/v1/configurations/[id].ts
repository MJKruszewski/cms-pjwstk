import {NextApiRequest, NextApiResponse} from "next";
import PcConfigurationsRepository from "@repository/pc-configurations.repository";
import {PcConfigurationDto} from "@domain/configuration.domain";
import {router} from "next/client";
import {ConfigurationMapper} from "@service/configuration.mapper";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const configurationRepository: PcConfigurationsRepository = await PcConfigurationsRepository.build();
    
    if (req.method === 'PUT') {
        await put(req, res, configurationRepository);
    } else if (req.method === 'GET') {
        await get(req, res, configurationRepository);
    } else {
        res.status(405).json({code: 'not-supported'});
    }
}

const put = async (req: NextApiRequest, res: NextApiResponse, configurationRepository: PcConfigurationsRepository) => {
    const configuration: PcConfigurationDto = req.body;
    const result = await configurationRepository.replaceOne(configuration.externalId, ConfigurationMapper.map(configuration));

    res.status(200).json(result.value);
};
const get = async (req: NextApiRequest, res: NextApiResponse, configurationRepository: PcConfigurationsRepository) => {
    const { id } = router.query;

    if (id === undefined) {
        res.status(404).json({code: 'not-fount'});

        return;
    }

    res.status(200).json(await configurationRepository.findOneByExternalId(typeof id === 'string' ? id : id.pop()))
};