import {
  Collection,
  FindAndModifyWriteOpResultObject,
  DeleteWriteOpResultObject,
  FindOneOptions,
  InsertOneWriteOpResult,
  OptionalId,
  WithId
} from 'mongodb';
import { FilterQuery } from 'mongoose';
import {PcConfiguration} from "@apiDomain/configuration.domain";

export default abstract class RepositoryAbstract<T> {
  constructor (
        protected readonly collection: Collection<T>
  ) {
  }

  public async findAll (options ?: FindOneOptions<any>): Promise<T[]> {
    return this.collection.find({}, options).toArray();
  }

  public async findByFilter (filter: FilterQuery<T>, options ?: FindOneOptions<any>): Promise<T[]> {
    // @ts-ignore
    return this.collection.find(filter, options).toArray();
  }

  public async count (): Promise<number> {
    return this.collection.countDocuments({});
  }

  async findOne (id): Promise<WithId<T>> {
    return this.collection.findOne({ _id: id });
  }

  async deleteOne (id): Promise<DeleteWriteOpResultObject> {
    return this.collection.deleteOne({ _id: id });
  }

  async putOne (id, entity: object): Promise<FindAndModifyWriteOpResultObject<T>> {
    return this.collection.findOneAndReplace({_id: id}, entity);
  }

  public async insertOne (entity: OptionalId<T>): Promise<InsertOneWriteOpResult<WithId<T>>> {
    return this.collection.insertOne(entity);
  }
}
