import {connectToDatabase} from "@middleware/mongo.middleware";
import {Collection} from "mongodb";
import RepositoryAbstract from "@repository/repository.abstract";

export const PRODUCTS_COLLECTION = 'products';
export enum ProductFeatureCodeEnum {
    PCI = 'pci',
    RAM = 'ram',
    SOCKET = 'socket',
    PROCESSOR = 'processor',
    PRODUCER = 'producer',
}
export interface Product {
    name: string,
    description: string,
    features: ProductFeature[],
    requirements: any,
}
export interface ProductFeature {
    code: ProductFeatureCodeEnum,
    value: string,
}

export default class ProductsRepository extends RepositoryAbstract<Product> {

    static async build(): Promise<ProductsRepository> {
        const connection = await connectToDatabase();

        return new ProductsRepository(connection.collection<Product>(PRODUCTS_COLLECTION));
    }
}
