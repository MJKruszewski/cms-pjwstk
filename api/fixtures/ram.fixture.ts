import * as faker from 'faker';
import {ProductFeatureCodeEnum, ProductTypeEnum} from "@apiDomain/product.domain";
import {FixturesService} from "@apiFixture/fixtures.service";

interface Ram {
    code: string,
    producer: string[],
    ddr: string[],
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
                value: Math.pow(2, faker.random.float({min: 1, max: 8, precision: 1})).toFixed(0).toString() + 'Gb'
            });

            features.push({
                code: 'clock',
                value: faker.random.float({min: 1200, max: 3600, precision: 400}).toFixed(0).toString() + 'Hz'
            });
            await FixturesService.insertOneProduct(ProductTypeEnum.RAM, ramImages, features, null);
        }
    }
}
