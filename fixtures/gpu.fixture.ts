import {connectToDatabase} from "@middleware/mongo.middleware";
import * as faker from 'faker';
import {PRODUCTS_COLLECTION} from "@repository/products.repository";
import {ProductFeatureCodeEnum, ProductTypeEnum} from "@domain/product.domain";

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

    await db.collection(PRODUCTS_COLLECTION).drop().catch(i => {});
    const collection = await db.collection(PRODUCTS_COLLECTION);

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
                value: faker.random.number({ min: 900, max: 2586, precision: 0}).toString()  + 'MHz'
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

            await collection.insertOne({
                name: faker.commerce.productName(),
                type: ProductTypeEnum.GPU,
                description: faker.commerce.productDescription(),
                features: features,
                requirements: requirements,
            })
        }
    }

    return true;
}