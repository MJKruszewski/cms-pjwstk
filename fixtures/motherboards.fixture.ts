import {connectToDatabase} from "@middleware/mongo.middleware";
import * as faker from 'faker';
import {PRODUCTS_COLLECTION, ProductTypeEnum} from "@repository/products.repository";

interface Motherboard {
    code: string,
    sockets: string[],
    ddr: string[],
    producer: string[],
    pci: string[],
}

const brands = [
    "AMD",
    "Intel"
];

const supports: Motherboard[] = [
    {
        code: "AMD",
        producer: [
            "GIGABYTE",
            "ASUS",
            "ASROCK",
            "MSI",
        ],
        sockets: [
            "AM5",
            "AM4",
            "AM3",
            "AM2",
        ],
        ddr: [
            "DDR1",
            "DDR2",
            "DDR3",
            "DDR4",
        ],
        pci: [
            "PCI-Ex16",
            "PCI-Ex8",
            "PCIx8",
        ],
    },
    {
        code: "Intel",
        producer: [
            "GIGABYTE",
            "ASUS",
            "ASROCK",
            "MSI",
        ],
        sockets: [
            "1200",
            "1151",
            "2066",
            "1150",
            "1155",
            "1155 Coffe lake",
        ],
        ddr: [
            "DDR1",
            "DDR2",
            "DDR3",
            "DDR4",
        ],
        pci: [
            "PCI-Ex16",
            "PCI-Ex8",
            "PCIx8",
        ],
    }
];

export async function motherboardFixture() {
    const db = await connectToDatabase();

    await db.collection(PRODUCTS_COLLECTION).drop().catch(i => {});
    const collection = await db.collection(PRODUCTS_COLLECTION);

    for (const brand of brands) {
        let index = supports.findIndex(value => {
            return value.code === brand;
        });
        let data: Motherboard = supports[index];

        for (let i = 0; i < faker.random.number({
            min: 12,
            max: 50
        }); i++) {
            let features = [];

            features.push({
                code: 'producer',
                value: faker.random.arrayElement(data.producer)
            });
            features.push({
                code: 'processor',
                value: brand
            });
            features.push({
                code: 'socket',
                value: faker.random.arrayElement(data.sockets)
            });
            features.push({
                code: 'ram',
                value: faker.random.arrayElement(data.ddr)
            });
            features.push({
                code: 'pci',
                value: "PCI-Ex16"
            });

            for (let i = 0; i < faker.random.number({
                min: 1,
                max: 5
            }); i++) {
                features.push({
                    code: 'pci',
                    value: faker.random.arrayElement(data.pci)
                });
            }

            await collection.insertOne({
                name: faker.commerce.productName(),
                type: ProductTypeEnum.MOTHERBOARD,
                description: faker.commerce.productDescription(),
                features: features,
                requirements: [],
            })
        }
    }

    return true;
}