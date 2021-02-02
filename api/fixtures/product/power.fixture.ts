import * as faker from 'faker';
import {ProductFeatureCodeEnum, ProductTypeEnum} from '@apiDomain/product.domain';
import { FixturesService } from '@apiFixture/fixtures.service';

interface Power {
    certificate: string[]
}

const brands = [
  'Chieftec',
  'Corsair'
];

const supports: Power =
    {
      certificate: [
        '80 PLUS',
        '80 PLUS Bronze',
        '80 PLUS Gold',
        '80 PLUS Platinum'
      ]
    };

const powerImages = [
  'products/power1.png',
  'products/power2.png'
];

export async function powerFixture () {
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
        value: 'ATX'
      });

      features.push({
        code: ProductFeatureCodeEnum.POWER_CERT,
        value: faker.random.arrayElement(supports.certificate)
      });

      features.push({
        code: ProductFeatureCodeEnum.POWER_MAX,
        value: faker.random.float({ min: 400, max: 1300, precision: 100 }).toFixed(0).toString() + 'W'
      });
      await FixturesService.insertOneProduct(ProductTypeEnum.POWER, powerImages, features, null);
    }
  }
}
