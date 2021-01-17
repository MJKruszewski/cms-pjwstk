import {PcConfiguration, PcConfigurationDto} from "@apiDomain/configuration.domain";
import {Cart, CartDto} from "@apiDomain/cart.domain";

export class CartMapper {
    static map(cartDto: CartDto): Cart {
        const configurations = [];
        const products = [];

        cartDto.configurations.forEach((item) => {
            configurations.push(item._id);
        });
        cartDto.products.forEach((item) => {
            products.push(item._id);
        });

        return  {
            externalId: cartDto.externalId,
            configurationIds: configurations,
            productIds: products
        };
    }
}