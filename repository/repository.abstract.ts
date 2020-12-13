import {Collection, InsertOneWriteOpResult, OptionalId, WithId} from "mongodb";

export default abstract class RepositoryAbstract<T> {

    constructor(
        protected readonly collection: Collection<T>
    ) {
    }

    public async findAll(): Promise<T[]> {
        return this.collection.find({}).toArray();
    }

    public async insertOne(entity: OptionalId<T>): Promise<InsertOneWriteOpResult<WithId<T>>> {
        return this.collection.insertOne(entity);
    }
}