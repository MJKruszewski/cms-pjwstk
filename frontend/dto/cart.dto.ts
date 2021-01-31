import { Product } from '@frontendDto/product.dto';
import { PcConfigurationDto } from '@frontendDto/configuration.dto';
import { WithId } from 'mongodb';

export interface Cart {
    externalId: string,
    productIds: string[],
    configurationIds: string[],
}

export interface CartDto {
    externalId: string, // generated on front, stored in local storage or cookie
    products: WithId<Product>[],
    configurations: WithId<PcConfigurationDto>[]
}
