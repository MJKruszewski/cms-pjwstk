import * as faker from 'faker';
import {ProductFeatureCodeEnum, ProductTypeEnum} from "@domain/product.domain";
import {FixturesService} from "@fixture/fixtures.service";

interface Ram {
    code: string,
    producer: string[],
    ddr: string[],
    capacity: string[]
}

const brands = [
    "Corsair",
    "Kingston"
];

const supports: Ram[] = [
    {
        code: "Corsair",
        producer: [
            "Corsair"
        ],
        ddr: [
            "DDR1",
            "DDR2",
            "DDR3",
            "DDR4",
        ],
        capacity: [
            "2GB",
            "4GB",
            "8GB",
            "16GB",
            "32GB",
            "64GB",
            "128GB"
        ]
    },
    {
        code: "Kingston",
        producer: [
            "Kingston"
        ],
        ddr: [
            "DDR1",
            "DDR2",
            "DDR3",
            "DDR4",
        ],
        capacity: [
            "2GB",
            "4GB",
            "8GB",
            "16GB",
            "32GB",
            "64GB",
            "128GB"
        ]
    },
];

const ramImages = [
    'ram1.png',
    'ram2.png'
];

export async function ramFixture() {

    for (const brand of brands) {
        let index = supports.findIndex(value => {
            return value.code === brand;
        });
        let data: Ram = supports[index];

        const quantity = faker.random.number({min: 12, max: 50});
        for (let i = 0; i < quantity; i++) {
            let features = [];

            features.push({
                code: 'producer',
                value: faker.random.arrayElement(data.producer)
            });

            features.push({
                code: 'type',
                value: faker.random.arrayElement(data.ddr)
            });

            features.push({
                code: 'capacity',
                value: faker.random.arrayElement(data.capacity)
            });

            features.push({
                code: 'clock',
                value: faker.random.float({min: 1200, max: 3600, precision: 400}).toFixed(1).toString() + 'Hz'
            });
            await FixturesService.insertOneProduct(ProductTypeEnum.RAM, ramImages, features, null);
        }
    }
}
