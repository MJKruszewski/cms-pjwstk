import RepositoryAbstract from "@apiRepository/repository.abstract";
import {connectToDatabase} from "@apiMiddleware/mongo.middleware";
import {Order} from "@apiDomain/order.domain";
import {ORDER_COLLECTION} from "@apiRepository/collections.config";

export default class OrderRepository extends RepositoryAbstract<Order> {
    static async build(): Promise<OrderRepository> {
        const connection = await connectToDatabase();

        return new OrderRepository(connection.collection<Order>(ORDER_COLLECTION));
    }
}