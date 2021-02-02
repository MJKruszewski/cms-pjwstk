import * as faker from 'faker';
import {ProductFeatureCodeEnum, ProductTypeEnum} from '@apiDomain/product.domain';
import { FixturesService } from '@apiFixture/fixtures.service';

interface Motherboard {
    code: string,
    sockets: string[],
    producer: string[],
    pci: string[],
    ddr: string[],
}

const brands = [
  'AMD',
  'Intel'
];

const supports: Motherboard[] = [
  {
    code: 'AMD',
    producer: [
      'GIGABYTE',
      'ASUS',
      'ASROCK',
      'MSI'
    ],
    sockets: [
      'AM5',
      'AM4',
      'AM3',
      'AM2'
    ],
    ddr: [
      'DDR1',
      'DDR2',
      'DDR3',
      'DDR4'
    ],
    pci: [
      'PCI-Ex16',
      'PCI-Ex8',
      'PCIx8'
    ]
  },
  {
    code: 'Intel',
    producer: [
      'GIGABYTE',
      'ASUS',
      'ASROCK',
      'MSI'
    ],
    sockets: [
      '1200',
      '1151',
      '2066',
      '1150',
      '1155',
      '1155 Coffe lake'
    ],
    ddr: [
      'DDR1',
      'DDR2',
      'DDR3',
      'DDR4'
    ],
    pci: [
      'PCI-Ex16',
      'PCI-Ex8',
      'PCIx8'
    ]
  }
];

const motherBoardImages = [
  'products/motherboard1.png',
  'products/motherboard2.png',
  'products/motherboard3.png'
];

export async function motherboardFixture () {
  for (const brand of brands) {
    const index = supports.findIndex(value => {
      return value.code === brand;
    });
    const data: Motherboard = supports[index];

    const quantity = faker.random.number({ min: 12, max: 50 });
    for (let i = 0; i < quantity; i++) {
      const features = [];

      features.push({
        code: ProductFeatureCodeEnum.PRODUCER,
        value: faker.random.arrayElement(data.producer)
      });
      features.push({
        code: ProductFeatureCodeEnum.PROCESSOR,
        value: brand
      });
      features.push({
        code: ProductFeatureCodeEnum.SOCKET,
        value: faker.random.arrayElement(data.sockets)
      });
      features.push({
        code: ProductFeatureCodeEnum.MEMORY_TYPE,
        value: faker.random.arrayElement(data.ddr)
      });
      features.push({
        code: ProductFeatureCodeEnum.PCI,
        value: 'PCI-Ex16'
      });

      const psiQuantity = faker.random.number({ min: 1, max: 5 });
      for (let i = 0; i < psiQuantity; i++) {
        features.push({
          code: ProductFeatureCodeEnum.PCI,
          value: faker.random.arrayElement(data.pci)
        });
      }

      await FixturesService.insertOneProduct(ProductTypeEnum.MOTHERBOARD, motherBoardImages, features, null);
    }
  }
}
