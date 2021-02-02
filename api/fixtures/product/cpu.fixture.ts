import * as faker from 'faker';
import {ProductFeatureCodeEnum, ProductTypeEnum} from '@apiDomain/product.domain';
import { FixturesService } from '@apiFixture/fixtures.service';

interface Processor {
    code: string,
    sockets: string[],
    cores: string[],
    producer: string[],
}

const brands = [
  'AMD',
  'Intel'
];

const supports: Processor[] = [
  {
    code: 'AMD',
    producer: [
      'AMD'
    ],
    cores: [
      '8',
      '12',
      '16',
      '32',
      '64'
    ],
    sockets: [
      'AM5',
      'AM4',
      'AM3',
      'AM2'
    ]
  },
  {
    code: 'Intel',
    producer: [
      'Intel'
    ],
    cores: [
      '2',
      '4'
    ],
    sockets: [
      '1200',
      '1151',
      '2066',
      '1150',
      '1155',
      '1155 Coffe lake'
    ]
  }
];

const cpuImages = [
  'products/cpu1.png',
  'products/cpu2.png',
  'products/cpu3.png',
  'products/cpu4.png'
];

export async function cpuFixture () {
  for (const brand of brands) {
    const index = supports.findIndex(value => {
      return value.code === brand;
    });
    const data: Processor = supports[index];

    const quantity = faker.random.number({ min: 12, max: 50 });
    for (let i = 0; i < quantity; i++) {
      const features = [];

      features.push({
        code: ProductFeatureCodeEnum.CLOCK,
        value: faker.random.float({ min: 1, max: 5, precision: 1 }).toString() + 'GHz'
      });
      features.push({
        code: ProductFeatureCodeEnum.CORES,
        value: faker.random.arrayElement(data.cores)
      });
      features.push({
        code: ProductFeatureCodeEnum.PRODUCER,
        value: faker.random.arrayElement(data.producer)
      });
      const socket = faker.random.arrayElement(data.sockets);
      features.push({
        code: ProductFeatureCodeEnum.SOCKET,
        value: socket
      });
      features.push({
        code: ProductFeatureCodeEnum.INTEGRATED_GRAPHICS,
        value: faker.random.boolean() ? '1' : '0'
      });

      const requirements = [];
      requirements.push({
        code: ProductFeatureCodeEnum.SOCKET,
        value: socket
      });

      await FixturesService.insertOneProduct(ProductTypeEnum.CPU, cpuImages, features, requirements);
    }
  }
}
