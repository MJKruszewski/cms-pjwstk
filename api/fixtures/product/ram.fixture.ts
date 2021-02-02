import * as faker from 'faker';
import {ProductFeatureCodeEnum, ProductTypeEnum} from '@apiDomain/product.domain';
import { FixturesService } from '@apiFixture/fixtures.service';

interface Ram {
    ddr: string[],
}

const brands = [
  'Corsair',
  'Kingston'
];

const support: Ram =
    {
      ddr: [
        'DDR1',
        'DDR2',
        'DDR3',
        'DDR4'
      ]
    };

const ramImages = [
  'products/ram1.png',
  'products/ram2.png'
];

export async function ramFixture () {
  for (const brand of brands) {
    const quantity = faker.random.number({ min: 12, max: 50 });
    for (let i = 0; i < quantity; i++) {
      const features = [];

      features.push({
        code: ProductFeatureCodeEnum.PRODUCER,
        value: brand
      });

      features.push({
        code: ProductFeatureCodeEnum.MEMORY_TYPE,
        value: faker.random.arrayElement(support.ddr)
      });

      features.push({
        code: ProductFeatureCodeEnum.CAPACITY,
        value: Math.pow(2, faker.random.float({ min: 1, max: 8, precision: 1 })).toFixed(0).toString() + 'Gb'
      });

      features.push({
        code: ProductFeatureCodeEnum.CLOCK,
        value: faker.random.float({ min: 1200, max: 3600, precision: 400 }).toFixed(0).toString() + 'Hz'
      });
      await FixturesService.insertOneProduct(ProductTypeEnum.RAM, ramImages, features, null);
    }
  }
}
