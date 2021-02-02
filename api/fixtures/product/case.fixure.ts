import * as faker from 'faker';
import {ProductFeatureCodeEnum, ProductTypeEnum} from '@apiDomain/product.domain';
import { FixturesService } from '@apiFixture/fixtures.service';

interface Case {
    type: string[]
}

const brands = [
  'Fractal Design',
  'Phanteks'
];

const support: Case =
    {
      type: [
        'Mini Tower / SFF',
        'Midi Tower',
        'Big Tower'
      ]
    };

const caseImages = [
  'products/case1.png',
  'products/case2.png'
];

export async function caseFixture () {
  for (const brand of brands) {
    const quantity = faker.random.number({ min: 12, max: 50 });
    for (let i = 0; i < quantity; i++) {
      const features = [];

      features.push({
        code: ProductFeatureCodeEnum.PRODUCER,
        value: brand
      });
      features.push({
        code: ProductFeatureCodeEnum.CASE_TYPE,
        value: faker.random.arrayElement(support.type)
      });

      await FixturesService.insertOneProduct(ProductTypeEnum.CASE, caseImages, features, null);
    }
  }
}
