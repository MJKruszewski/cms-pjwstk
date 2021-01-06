import {News} from "@apiDomain/news.domain";
import {connectToDatabase} from "@apiMiddleware/mongo.middleware";
import {NEWS_COLLECTION} from "@apiRepository/collections.config";
import {ShippingMethod} from "@apiDomain/shipping-method.domain";
import * as faker from "faker";

const news: ShippingMethod[] = [
    {
        cover: 'shippings/todo.jpg',
        maxItems: faker.random.number({min: 10, max: 20}),
        minItems: faker.random.number({min: 1, max: 3}),
        price: faker.random.float({min: 2, max: 90, precision: 2}).toString(),
        name: 'UPS'
    },
    {
        cover: 'shippings/todo.jpg',
        maxItems: faker.random.number({min: 10, max: 20}),
        minItems: faker.random.number({min: 1, max: 3}),
        price: faker.random.float({min: 2, max: 60, precision: 2}).toString(),
        name: 'DHL'
    },
    {
        cover: 'shippings/todo.jpg',
        maxItems: faker.random.number({min: 10, max: 20}),
        minItems: faker.random.number({min: 1, max: 3}),
        price: faker.random.float({min: 2, max: 60, precision: 2}).toString(),
        name: 'DPD'
    },
    {
        cover: 'shippings/todo.jpg',
        maxItems: faker.random.number({min: 10, max: 20}),
        minItems: faker.random.number({min: 1, max: 3}),
        price: faker.random.float({min: 2, max: 60, precision: 2}).toString(),
        name: 'FedEx'
    },
];

export async function shippingMethodsFixture() {
    const db = await connectToDatabase();
    const collection = await db.collection(NEWS_COLLECTION);

    for (let i = 0; i < 5; i++) {
        news.forEach(item => {
            collection.insertOne({...item});
        })
    }
}