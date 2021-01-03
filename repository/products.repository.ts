import {connectToDatabase} from "@middleware/mongo.middleware";
import RepositoryAbstract from "@repository/repository.abstract";
import {Product, ProductTypeEnum} from "@domain/product.domain";
import {PRODUCTS_COLLECTION} from "@repository/collections.config";
import {Cursor} from "mongodb";

export default class ProductsRepository extends RepositoryAbstract<Product> {

    static async build(): Promise<ProductsRepository> {
        const connection = await connectToDatabase();

        return new ProductsRepository(connection.collection<Product>(PRODUCTS_COLLECTION));
    }

    async findByTypeAndPromoted(type: ProductTypeEnum, promoted: boolean): Promise<Cursor<Product>> {
        return this.collection.find({ type: type, promoted: promoted});
    }
}
