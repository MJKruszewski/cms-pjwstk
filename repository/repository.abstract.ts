import {Collection} from "mongodb";

export default abstract class RepositoryAbstract<T> {

    constructor(
        protected readonly collection: Collection<T>
    ) {
    }

    public async findAll(): Promise<T[]> {
        return this.collection.find({}).toArray();
    }
}