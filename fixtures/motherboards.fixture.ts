import * as faker from 'faker';
import {ProductTypeEnum} from "@domain/product.domain";
import {FixturesService} from "@fixture/fixtures.service";

interface Motherboard {
    code: string,
    sockets: string[],
    producer: string[],
    pci: string[],
    ddr: string[],
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

const motherBoardImages = [
    'motherboard1.png',
    'motherboard2.png',
    'motherboard3.png',
];

export async function motherboardFixture() {

    for (const brand of brands) {
        let index = supports.findIndex(value => {
            return value.code === brand;
        });
        let data: Motherboard = supports[index];

        const quantity = faker.random.number({min: 12, max: 50});
        for (let i = 0; i < quantity; i++) {
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
                code: 'memoryType',
                value: faker.random.arrayElement(data.ddr)
            });
            features.push({
                code: 'pci',
                value: "PCI-Ex16"
            });

            const psiQuantity = faker.random.number({min: 1, max: 5});

            for (let i = 0; i < psiQuantity; i++) {
                features.push({
                    code: 'pci',
                    value: faker.random.arrayElement(data.pci)
                });
            }

            await FixturesService.insertOneProduct(ProductTypeEnum.MOTHERBOARD, motherBoardImages, features, null);

        }
    }
}
