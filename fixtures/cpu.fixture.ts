import {connectToDatabase} from "@middleware/mongo.middleware";
import * as faker from 'faker';
import {ProductTypeEnum} from "@domain/product.domain";
import {PRODUCTS_COLLECTION} from "@repository/collections.config";

interface Processor {
    code: string,
    sockets: string[],
    cores: string[],
    producer: string[],
}

const brands = [
    "AMD",
    "Intel"
];

const supports: Processor[] = [
    {
        code: "AMD",
        producer: [
            "AMD",
        ],
        cores: [
            '8',
            '12',
            '16',
            '32',
            '64'
        ],
        sockets: [
            "AM5",
            "AM4",
            "AM3",
            "AM2",
        ],
    },
    {
        code: "Intel",
        producer: [
            "Intel",
        ],
        cores: [
            '2',
            '4',
        ],
        sockets: [
            "1200",
            "1151",
            "2066",
            "1150",
            "1155",
            "1155 Coffe lake",
        ],
    }
];

export async function cpuFixture() {
    const db = await connectToDatabase();
    const collection = await db.collection(PRODUCTS_COLLECTION);

    for (const brand of brands) {
        let index = supports.findIndex(value => {
            return value.code === brand;
        });
        let data: Processor = supports[index];

        for (let i = 0; i < faker.random.number({
            min: 12,
            max: 50
        }); i++) {
            let features = [];

            features.push({
                code: 'clock',
                value: faker.random.float({ min: 1, max: 5, precision: 1}).toString()  + 'GHz'
            });
            features.push({
                code: 'cores',
                value: faker.random.arrayElement(data.cores)
            });
            features.push({
                code: 'producer',
                value: faker.random.arrayElement(data.producer)
            });
            let socket = faker.random.arrayElement(data.sockets);
            features.push({
                code: 'socket',
                value: socket
            });
            features.push({
                code: 'integratedGraphics',
                value: faker.random.boolean() ? '1' : '0'
            });

            let requirements = [];
            requirements.push({
                code: 'socket',
                value: socket
            });

            const all = faker.random.number({min: 1300, max: 5000});
            const sold = faker.random.number({min: 1, max: 1000});

            await collection.insertOne({
                name: faker.commerce.productName(),
                type: ProductTypeEnum.PROCESSOR,
                description: faker.commerce.productDescription(),
                images: [
                    {
                        src: 'gpu1.png'
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

    return true;
}