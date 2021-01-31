import { connectToDatabase } from '@apiMiddleware/mongo.middleware';
import { SHIPPING_METHODS_COLLECTION } from '@apiRepository/collections.config';
import { ShippingMethod } from '@apiDomain/shipping-method.domain';
import * as faker from 'faker';

const shippingMethods: ShippingMethod[] = [
  {
    cover: 'shipping-method/ups.png',
    maxItems: faker.random.number({ min: 10, max: 20 }),
    minItems: faker.random.number({ min: 1, max: 3 }),
    price: faker.random.float({ min: 2, max: 90, precision: 2 }).toString(),
    name: 'UPS'
  },
  {
    cover: 'shipping-method/dhl.png',
    maxItems: faker.random.number({ min: 10, max: 20 }),
    minItems: faker.random.number({ min: 1, max: 3 }),
    price: faker.random.float({ min: 2, max: 60, precision: 2 }).toString(),
    name: 'DHL'
  },
  {
    cover: 'shipping-method/dpd.png',
    maxItems: faker.random.number({ min: 10, max: 20 }),
    minItems: faker.random.number({ min: 1, max: 3 }),
    price: faker.random.float({ min: 2, max: 60, precision: 2 }).toString(),
    name: 'DPD'
  },
  {
    cover: 'shipping-method/fedex.png',
    maxItems: faker.random.number({ min: 10, max: 20 }),
    minItems: faker.random.number({ min: 1, max: 3 }),
    price: faker.random.float({ min: 2, max: 60, precision: 2 }).toString(),
    name: 'FedEx'
  }
];

export async function shippingMethodsFixture () {
  const db = await connectToDatabase();
  const collection = await db.collection(SHIPPING_METHODS_COLLECTION);
  collection.insertMany(shippingMethods);
}
