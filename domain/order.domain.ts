import {WithId} from "mongodb";
import {PcConfigurationDto} from "@domain/configuration.domain";

export interface OrderDto {
    email: string;
    configurations: WithId<PcConfigurationDto>[];
}
export interface Order {
    email: string;
    configurations: string[];
}