import {connectToDatabase} from "@middleware/mongo.middleware";
import {PRODUCTS_COLLECTION} from "@repository/collections.config";
import faker from "faker";
import {ProductTypeEnum} from "@domain/product.domain";

export class FixturesService {

    static async insertOneProduct(type: ProductTypeEnum, images: string[], features: any[], requirements: any[]) {

        const db = await connectToDatabase();
        const collection = await db.collection(PRODUCTS_COLLECTION);
        let promo = 0;
        const maxPromo = faker.random.number({min: 1, max: 6});

        const all = faker.random.number({min: 1300, max: 5000});
        const sold = faker.random.number({min: 1, max: 1000});

        await collection.insertOne({
            name: faker.commerce.productName(),
            type: type,
            promoted: (++promo < maxPromo),
            description: faker.commerce.productDescription(),
            images: [
                {
                    src: faker.random.arrayElement(images)
                }
            ],
            stock: {
                free: all - sold,
                sold: sold,
                all: all,
            },
            price: {
                base: faker.random.float({min: 2, max: 15000, precision: 2}).toString(),
            },
            features: features,
            requirements: requirements,
        })
    }
}


