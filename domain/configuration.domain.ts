import {Product} from "@domain/product.domain";
import {WithId} from "mongodb";

export interface PcConfigurationDto {
    externalId: string, //generated on front, stored in local storage or cookie
    components: WithId<Product>[]
}

export interface PcConfiguration {
    externalId: string, //generated on front, stored in local storage or cookie
    components: string[]
}