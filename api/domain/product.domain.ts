export interface ProductStock {
    free: number,
    sold: number,
    all: number,
}
export interface ProductPrice {
    base: string,
}
export interface Product {
    name: string,
    description: string,
    promoted ?: boolean,
    images: Image[]
    price: ProductPrice,
    stock: ProductStock,
    type: ProductTypeEnum,
    features: ProductFeature[],
    requirements: ProductRequirement[],
}
export interface Image {
    src: string;
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
    CASE_TYPE = 'caseType',
    DRIVE_INTERFACE = 'driveInterface',
    CAPACITY = 'capacity',
    LOAD_SPEED = 'loadSpeed',
    SAVE_SPEED = 'saveSpeed',
    POWER_CERT = 'powerCert',
    POWER_MAX = 'powerMax',
}
export enum ProductTypeEnum {
    MOTHERBOARD = 'motherboard',
    CPU = 'processor',
    RAM = 'ram',
    GPU = 'gpu',
    POWER = 'power',
    STORAGE = 'storage',
    CASE = 'case'
}
export interface ProductFeature {
    code: ProductFeatureCodeEnum,
    value: string,
}
export interface ProductRequirement {
    code: ProductFeatureCodeEnum,
    value: string,
}
