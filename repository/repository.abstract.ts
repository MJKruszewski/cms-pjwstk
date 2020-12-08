import {Collection} from "mongodb";
import {connectToDatabase} from "@middleware/mongo.middleware";
import {Product, PRODUCTS_COLLECTION} from "@repository/products.repository";

export default abstract class RepositoryAbstract<T> {

    constructor(
        protected readonly collection: Collection<T>
    ) {
    }

    public async findAll(): Promise<T[]> {
        return this.collection.find({}).toArray();
    }
}