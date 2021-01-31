import RepositoryAbstract from '@apiRepository/repository.abstract';
import { connectToDatabase } from '@apiMiddleware/mongo.middleware';
import { PcConfiguration } from '@apiDomain/configuration.domain';
import { FindAndModifyWriteOpResultObject, WithId } from 'mongodb';
import { PC_CONFIGURATION_COLLECTION } from '@apiRepository/collections.config';

export default class PcConfigurationsRepository extends RepositoryAbstract<PcConfiguration> {
  static async build (): Promise<PcConfigurationsRepository> {
    const connection = await connectToDatabase();

    return new PcConfigurationsRepository(connection.collection<PcConfiguration>(PC_CONFIGURATION_COLLECTION));
  }

  async findOneByExternalId (externalId: string): Promise<WithId<PcConfiguration>> {
    return this.collection.findOne({ externalId: externalId });
  }

  async replaceOne (externalId: string, entity: PcConfiguration): Promise<FindAndModifyWriteOpResultObject<PcConfiguration>> {
    return this.collection.findOneAndReplace({ externalId: externalId }, entity);
  }
}
