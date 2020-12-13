import RepositoryAbstract from "@repository/repository.abstract";
import {connectToDatabase} from "@middleware/mongo.middleware";
import {PcConfiguration} from "@domain/configuration.domain";
import {FindAndModifyWriteOpResultObject, WithId} from "mongodb";

const PC_CONFIGURATION_COLLECTION = 'pc_configurations';

export default class PcConfigurationsRepository extends RepositoryAbstract<PcConfiguration> {
    static async build(): Promise<PcConfigurationsRepository> {
        const connection = await connectToDatabase();

        return new PcConfigurationsRepository(connection.collection<PcConfiguration>(PC_CONFIGURATION_COLLECTION));
    }

    async findOneByExternalId(externalId: string): Promise<WithId<PcConfiguration>> {
        return this.collection.findOne({ externalId: externalId })
    }

    async replaceOne(externalId: string, entity: PcConfiguration): Promise<FindAndModifyWriteOpResultObject<PcConfiguration>> {
        return this.collection.findOneAndReplace({ externalId: externalId }, entity);
    }
}