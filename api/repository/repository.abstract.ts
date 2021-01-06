import {Collection, InsertOneWriteOpResult, OptionalId, WithId, FindOneOptions} from "mongodb";

export default abstract class RepositoryAbstract<T> {

    constructor(
        protected readonly collection: Collection<T>
    ) {
    }

    public async findAll(options ?: FindOneOptions<any>): Promise<T[]> {
        return this.collection.find({}, options).toArray();
    }

    public async count(): Promise<number> {
        return this.collection.countDocuments({});
    }

    async findOne(id): Promise<WithId<T>> {
        return this.collection.findOne({_id: id})
    }

    public async insertOne(entity: OptionalId<T>): Promise<InsertOneWriteOpResult<WithId<T>>> {
        return this.collection.insertOne(entity);
    }
}