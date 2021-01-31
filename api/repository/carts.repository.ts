import RepositoryAbstract from '@apiRepository/repository.abstract';
import { connectToDatabase } from '@apiMiddleware/mongo.middleware';
import { ReplaceWriteOpResult, WithId } from 'mongodb';
import { CART_COLLECTION } from '@apiRepository/collections.config';
import { Cart } from '@apiDomain/cart.domain';

export default class CartsRepository extends RepositoryAbstract<Cart> {
  static async build (): Promise<CartsRepository> {
    const connection = await connectToDatabase();

    return new CartsRepository(connection.collection<Cart>(CART_COLLECTION));
  }

  async findOneByExternalId (externalId: string): Promise<WithId<Cart>> {
    return this.collection.findOne({ externalId: externalId });
  }

  async replaceOne (externalId: string, entity: Cart): Promise<ReplaceWriteOpResult> {
    return this.collection.replaceOne({ externalId: externalId }, entity, { upsert: true });
  }
}
