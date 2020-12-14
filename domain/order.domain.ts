import {WithId} from "mongodb";
import {PcConfigurationDto} from "@domain/configuration.domain";
import * as paypal from "paypal-rest-sdk";

export interface OrderDto {
    email: string;
    paymentId: string;
    configurations: WithId<PcConfigurationDto>[];
}
export interface Order {
    email: string;
    payment: paypal.PaymentResponse;
    configurations: string[];
}