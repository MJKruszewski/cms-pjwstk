import {connectToDatabase} from "@middleware/mongo.middleware";
import RepositoryAbstract from "@repository/repository.abstract";
import {Product} from "@domain/product.domain";

export const PRODUCTS_COLLECTION = 'products';

export default class ProductsRepository extends RepositoryAbstract<Product> {

    static async build(): Promise<ProductsRepository> {
        const connection = await connectToDatabase();

        return new ProductsRepository(connection.collection<Product>(PRODUCTS_COLLECTION));
    }
}
