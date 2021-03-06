import { NextApiRequest, NextApiResponse } from 'next';
import PcConfigurationsRepository from '@apiRepository/pc-configurations.repository';
import { PcConfigurationDto } from '@apiDomain/configuration.domain';
import { ConfigurationMapper } from '@apiService/configuration.mapper';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'OPTIONS') return res.status(200).json({});

  const configurationRepository: PcConfigurationsRepository = await PcConfigurationsRepository.build();

  if (req.method === 'POST') {
    await post(req, res, configurationRepository);
  } else if (req.method === 'GET') {
    await get(req, res, configurationRepository);
  } else {
    res.status(405).json({ code: 'not-supported' });
  }
};

const post = async (req: NextApiRequest, res: NextApiResponse, configurationRepository: PcConfigurationsRepository) => {
  const configuration: PcConfigurationDto = req.body;
  const result = await configurationRepository.insertOne(ConfigurationMapper.map(configuration));

  res.status(201).json(result.ops.pop());
};
const get = async (req: NextApiRequest, res: NextApiResponse, configurationRepository: PcConfigurationsRepository) => {
  res.status(200).json(await configurationRepository.findAll());
};
