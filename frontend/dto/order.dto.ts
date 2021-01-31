import { WithId } from 'mongodb';
import { PcConfigurationDto } from '@frontendDto/configuration.dto';
import { User } from '@frontendDto/user.dto';
import { ShippingMethod } from '@frontendDto/shipping-method.dto';

export interface OrderDto {
    user: User;
    shippingMethod: ShippingMethod;
    orderId: string;
    configurations: WithId<PcConfigurationDto>[];
}

export interface Order {
    email: string;
    externalOrder: OrderDetails & PaymentDetails;
    configurations: string[];
}

export interface OrderDetails {
    status: string;
    intent: string;
    payment_source: {
        alipay: {
            name: string;
            country_code: string;
        },
    },
    purchase_units: {
        custom_id?: string;
        reference_id: string;
        amount: {
            currency_code: string;
            value: string;
        },
        payee: {
            email_address: string
        }
    }[];
    create_time: string;
    links: Links;
}

export type Links = {
    rel: string,
    method: string,
    href: string,
}[];

export interface PaymentDetails {
    id: string,
    status: string,
    amount: {
        total: string;
        currency: string;
    },
    invoice_id: string,
    seller_protection: {
        status: string,
        dispute_categories: string[]
    },
    expiration_time: string,
    create_time: string,
    update_time?: string,
    links: Links;
}
