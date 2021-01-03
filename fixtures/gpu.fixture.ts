import {connectToDatabase} from "@middleware/mongo.middleware";
import * as faker from 'faker';
import {ProductFeatureCodeEnum, ProductTypeEnum} from "@domain/product.domain";
import {PRODUCTS_COLLECTION} from "@repository/collections.config";

interface Gpu {
    code: string,
    producer: string[],
    pci: string[],
    ddr: string[],
}

const brands = [
    "AMD",
    "Nvidia"
];

const supports: Gpu[] = [
    {
        code: "AMD",
        producer: [
            "AMD",
            "GIGABYTE",
            "ASUS",
            "ASROCK",
            "MSI",
        ],
        pci: [
            "PCI-Ex16",
            "PCI-Ex8",
            "PCIx8",
        ],
        ddr: [
            "GDDR1",
            "GDDR2",
            "GDDR3",
            "GDDR4",
        ],
    },
    {
        code: "Nvidia",
        producer: [
            "Nvidia",
            "GIGABYTE",
            "ASUS",
            "ASROCK",
            "MSI",
        ],
        ddr: [
            "GDDR1",
            "GDDR2",
            "GDDR3",
            "GDDR4",
        ],
        pci: [
            "PCI-Ex16",
            "PCI-Ex8",
            "PCIx8",
        ],
    }
];

export async function gpuFixture() {
    const db = await connectToDatabase();
    const collection = await db.collection(PRODUCTS_COLLECTION);
    let promo = 0;
    const maxPromo = faker.random.number({min: 1, max: 6});
    const images = [
        'gpu1.png',
        'gpu2.png',
        'gpu3.png',
    ];

    for (const brand of brands) {
        let index = supports.findIndex(value => {
            return value.code === brand;
        });
        let data: Gpu = supports[index];

        for (let i = 0; i < faker.random.number({
            min: 12,
            max: 50
        }); i++) {
            let features = [];

            features.push({
                code: 'clock',
                value: faker.random.number({min: 900, max: 2586, precision: 0}).toString() + 'MHz'
            });
            features.push({
                code: 'producer',
                value: faker.random.arrayElement(data.producer)
            });
            let pci = faker.random.arrayElement(data.pci);
            features.push({
                code: ProductFeatureCodeEnum.PCI_CONNECTOR,
                value: pci
            });

            let requirements = [];
            requirements.push({
                code: ProductFeatureCodeEnum.PCI,
                value: pci
            });

            features.push({
                code: ProductFeatureCodeEnum.HDMI_PORT,
                value: faker.random.number({
                    min: 1,
                    max: 5
                }).toString()
            });

            features.push({
                code: ProductFeatureCodeEnum.DISPLAY_PORT,
                value: faker.random.number({
                    min: 1,
                    max: 5
                }).toString()
            });

            const all = faker.random.number({min: 1300, max: 5000});
            const sold = faker.random.number({min: 1, max: 1000});

            await collection.insertOne({
                name: faker.commerce.productName(),
                type: ProductTypeEnum.GPU,
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

    return true;
}