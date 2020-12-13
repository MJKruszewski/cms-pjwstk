export interface ProductStock {
    free: number,
    sold: number,
    available: number,
}
export interface ProductPrice {
    base: string,
}
export interface Product {
    name: string,
    description: string,
    price: ProductPrice,
    stock: ProductStock,
    type: ProductTypeEnum,
    features: ProductFeature[],
    requirements: ProductRequirement[],
}
export enum ProductFeatureCodeEnum {
    PCI = 'pci',
    HDMI_PORT = 'hdmiPorts',
    DISPLAY_PORT = 'displayPorts',
    PCI_CONNECTOR = 'pciConnector',
    INTEGRATED_GRAPHICS = 'integratedGraphics',
    SOCKET = 'socket',
    PROCESSOR = 'processor',
    PRODUCER = 'producer',
    CLOCK = 'clock',
    CORES = 'cores',
    MEMORY_TYPE = 'memoryType',
    MEMORY_SIZE = 'memorySize',
}
export enum ProductTypeEnum {
    MOTHERBOARD = 'motherboard',
    PROCESSOR = 'processor',
    RAM = 'ram',
    GPU = 'gpu',
    POWER = 'power',
    STORAGE = 'storage',
}
export interface ProductFeature {
    code: ProductFeatureCodeEnum,
    value: string,
}
export interface ProductRequirement {
    code: ProductFeatureCodeEnum,
    value: string,
}