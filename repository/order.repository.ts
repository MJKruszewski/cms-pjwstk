import RepositoryAbstract from "@repository/repository.abstract";
import {connectToDatabase} from "@middleware/mongo.middleware";
import {Order} from "@domain/order.domain";
import {ORDER_COLLECTION} from "@repository/collections.config";

export default class OrderRepository extends RepositoryAbstract<Order> {
    static async build(): Promise<OrderRepository> {
        const connection = await connectToDatabase();

        return new OrderRepository(connection.collection<Order>(ORDER_COLLECTION));
    }
}