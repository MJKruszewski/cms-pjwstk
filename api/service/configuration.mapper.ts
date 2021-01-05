import {PcConfiguration, PcConfigurationDto} from "@apiDomain/configuration.domain";

export class ConfigurationMapper {
    static map(configuration: PcConfigurationDto): PcConfiguration {
        const ids = [];

        configuration.components.forEach((item) => {
            ids.push(item._id);
        });

        return  {
            externalId: configuration.externalId,
            components: ids
        };
    }
}