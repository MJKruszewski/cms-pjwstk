import * as faker from 'faker';
import { ProductFeatureCodeEnum, ProductTypeEnum } from '@apiDomain/product.domain';
import { FixturesService } from '@apiFixture/fixtures.service';

interface Gpu {
    code: string,
    producer: string[],
    pci: string[],
    ddr: string[],
}

const brands = [
  'AMD',
  'Nvidia'
];

const supports: Gpu[] = [
  {
    code: 'AMD',
    producer: [
      'AMD',
      'GIGABYTE',
      'ASUS',
      'ASROCK',
      'MSI'
    ],
    pci: [
      'PCI-Ex16',
      'PCI-Ex8',
      'PCIx8'
    ],
    ddr: [
      'GDDR1',
      'GDDR2',
      'GDDR3',
      'GDDR4'
    ]
  },
  {
    code: 'Nvidia',
    producer: [
      'Nvidia',
      'GIGABYTE',
      'ASUS',
      'ASROCK',
      'MSI'
    ],
    ddr: [
      'GDDR1',
      'GDDR2',
      'GDDR3',
      'GDDR4'
    ],
    pci: [
      'PCI-Ex16',
      'PCI-Ex8',
      'PCIx8'
    ]
  }
];

const gpuImages = [
  'products/gpu1.png',
  'products/gpu2.png',
  'products/gpu3.png'
];

export async function gpuFixture () {
  for (const brand of brands) {
    const index = supports.findIndex(value => {
      return value.code === brand;
    });
    const data: Gpu = supports[index];

    const quantity = faker.random.number({ min: 12, max: 50 });
    for (let i = 0; i < quantity; i++) {
      const features = [];

      features.push({
        code: 'clock',
        value: faker.random.float({ min: 900, max: 2586, precision: 600 }).toFixed(0).toString() + 'MHz'
      });
      features.push({
        code: 'producer',
        value: faker.random.arrayElement(data.producer)
      });
      const pci = faker.random.arrayElement(data.pci);
      features.push({
        code: ProductFeatureCodeEnum.PCI_CONNECTOR,
        value: pci
      });

      const requirements = [];
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

      await FixturesService.insertOneProduct(ProductTypeEnum.GPU, gpuImages, features, requirements);
    }
  }
}
