import {connectToDatabase} from "@apiMiddleware/mongo.middleware";
import RepositoryAbstract from "@apiRepository/repository.abstract";
import {SHIPPING_METHODS_COLLECTION} from "@apiRepository/collections.config";
import {ShippingMethod} from "@apiDomain/shipping-method.domain";

export default class ShippingMethodsRepository extends RepositoryAbstract<ShippingMethod> {

    static async build(): Promise<ShippingMethodsRepository> {
        const connection = await connectToDatabase();

        return new ShippingMethodsRepository(connection.collection<ShippingMethod>(SHIPPING_METHODS_COLLECTION));
    }
}
