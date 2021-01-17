import {WithId} from "mongodb";
import {Product} from "@apiDomain/product.domain";
import {PcConfigurationDto} from "@apiDomain/configuration.domain";

export interface Cart {
    externalId: string,
    productIds: string[],
    configurationIds: string[],
}

export interface CartDto {
    externalId: string, //generated on front, stored in local storage or cookie
    products: WithId<Product>[],
    configurations: WithId<PcConfigurationDto>[]
}