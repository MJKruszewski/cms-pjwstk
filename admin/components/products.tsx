import {BooleanInput, ArrayInput, SimpleFormIterator, Create, DateInput, Edit, NumberInput, SelectInput, SimpleForm, TextInput} from "react-admin";
import React from "react";
import RichTextInput from 'ra-input-rich-text';

enum ProductFeatureCodeEnum {
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
enum ProductTypeEnum {
    MOTHERBOARD = 'motherboard',
    CPU = 'processor',
    RAM = 'ram',
    GPU = 'gpu',
    POWER = 'power',
    STORAGE = 'storage',
    CASE = 'case'
}

export const ProductsCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name"/>
            <BooleanInput source="promoted"/>
            <TextInput source="price.base" />
            <NumberInput source="stock.free"/>
            <NumberInput source="stock.all"/>
            <NumberInput source="stock.sold"/>
            <SelectInput source="type" choices={[
                {id: ProductTypeEnum.CASE, name: 'Case'},
                {id: ProductTypeEnum.CPU, name: 'CPU'},
                {id: ProductTypeEnum.GPU, name: 'GPU'},
                {id: ProductTypeEnum.MOTHERBOARD, name: 'Motherboard'},
                {id: ProductTypeEnum.POWER, name: 'Power'},
                {id: ProductTypeEnum.RAM, name: 'RAM'},
                {id: ProductTypeEnum.CASE, name: 'Case'},
            ]}/>
            <ArrayInput source="images">
                <SimpleFormIterator>
                    <SelectInput source="src" choices={[
                        {id: 'products/case1.png', name: 'case1.png'},
                        {id: 'products/case2.png', name: 'case1.png'},
                        {id: 'products/cpu1.png', name: 'cpu1.png'},
                        {id: 'products/cpu2.png', name: 'cpu2.png'},
                        {id: 'products/cpu3.png', name: 'cpu3.png'},
                        {id: 'products/cpu4.png', name: 'cpu4.png'},
                        {id: 'products/drive1.png', name: 'drive1.png'},
                        {id: 'products/drive2.png', name: 'drive2.png'},
                        {id: 'products/gpu1.png', name: 'gpu1.png'},
                        {id: 'products/gpu2.png', name: 'gpu2.png'},
                        {id: 'products/gpu3.png', name: 'gpu3.png'},
                        {id: 'products/motherboard1.png', name: 'motherboard1.png'},
                        {id: 'products/motherboard2.png', name: 'motherboard2.png'},
                        {id: 'products/motherboard3.png', name: 'motherboard3.png'},
                        {id: 'products/power1.png', name: 'power1.png'},
                        {id: 'products/power2.png', name: 'power2.png'},
                        {id: 'products/ram1.png', name: 'ram1.png'},
                        {id: 'products/ram2.png', name: 'ram2.png'},
                    ]}/>
                </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput source="features">
                <SimpleFormIterator>
                    <SelectInput source="code" choices={[
                        {id: ProductFeatureCodeEnum.CLOCK, name: 'Clock'},
                        {id: ProductFeatureCodeEnum.CORES, name: 'Cores'},
                        {id: ProductFeatureCodeEnum.DISPLAY_PORT, name: 'Display port'},
                        {id: ProductFeatureCodeEnum.HDMI_PORT, name: 'HDMI port'},
                        {id: ProductFeatureCodeEnum.INTEGRATED_GRAPHICS, name: 'Integrated graphics'},
                        {id: ProductFeatureCodeEnum.MEMORY_SIZE, name: 'Memory size'},
                        {id: ProductFeatureCodeEnum.MEMORY_TYPE, name: 'Memory type'},
                        {id: ProductFeatureCodeEnum.PCI, name: 'PCI Port'},
                        {id: ProductFeatureCodeEnum.PCI_CONNECTOR, name: 'PCI Connector'},
                        {id: ProductFeatureCodeEnum.PROCESSOR, name: 'Processor'},
                        {id: ProductFeatureCodeEnum.PRODUCER, name: 'Producer'},
                        {id: ProductFeatureCodeEnum.SOCKET, name: 'Socket'},
                    ]}/>
                    <TextInput source="value"/>
                </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput source="requirements">
                <SimpleFormIterator>
                    <SelectInput source="code" choices={[
                        {id: ProductFeatureCodeEnum.CLOCK, name: 'Clock'},
                        {id: ProductFeatureCodeEnum.CORES, name: 'Cores'},
                        {id: ProductFeatureCodeEnum.DISPLAY_PORT, name: 'Display port'},
                        {id: ProductFeatureCodeEnum.HDMI_PORT, name: 'HDMI port'},
                        {id: ProductFeatureCodeEnum.INTEGRATED_GRAPHICS, name: 'Integrated graphics'},
                        {id: ProductFeatureCodeEnum.MEMORY_SIZE, name: 'Memory size'},
                        {id: ProductFeatureCodeEnum.MEMORY_TYPE, name: 'Memory type'},
                        {id: ProductFeatureCodeEnum.PCI, name: 'PCI Port'},
                        {id: ProductFeatureCodeEnum.PCI_CONNECTOR, name: 'PCI Connector'},
                        {id: ProductFeatureCodeEnum.PROCESSOR, name: 'Processor'},
                        {id: ProductFeatureCodeEnum.PRODUCER, name: 'Producer'},
                        {id: ProductFeatureCodeEnum.SOCKET, name: 'Socket'},
                    ]}/>
                    <TextInput source="value"/>
                </SimpleFormIterator>
            </ArrayInput>
            <RichTextInput source="description"/>
        </SimpleForm>
    </Create>
);

export const ProductsEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name"/>
            <BooleanInput source="promoted"/>
            <TextInput source="price.base" />
            <NumberInput source="stock.free"/>
            <NumberInput source="stock.all"/>
            <NumberInput source="stock.sold"/>
            <SelectInput source="type" choices={[
                {id: ProductTypeEnum.CASE, name: 'Case'},
                {id: ProductTypeEnum.CPU, name: 'CPU'},
                {id: ProductTypeEnum.GPU, name: 'GPU'},
                {id: ProductTypeEnum.MOTHERBOARD, name: 'Motherboard'},
                {id: ProductTypeEnum.POWER, name: 'Power'},
                {id: ProductTypeEnum.RAM, name: 'RAM'},
                {id: ProductTypeEnum.CASE, name: 'Case'},
            ]}/>
            <ArrayInput source="images">
                <SimpleFormIterator>
                    <SelectInput source="src" choices={[
                        {id: 'products/case1.png', name: 'case1.png'},
                        {id: 'products/case2.png', name: 'case1.png'},
                        {id: 'products/cpu1.png', name: 'cpu1.png'},
                        {id: 'products/cpu2.png', name: 'cpu2.png'},
                        {id: 'products/cpu3.png', name: 'cpu3.png'},
                        {id: 'products/cpu4.png', name: 'cpu4.png'},
                        {id: 'products/drive1.png', name: 'drive1.png'},
                        {id: 'products/drive2.png', name: 'drive2.png'},
                        {id: 'products/gpu1.png', name: 'gpu1.png'},
                        {id: 'products/gpu2.png', name: 'gpu2.png'},
                        {id: 'products/gpu3.png', name: 'gpu3.png'},
                        {id: 'products/motherboard1.png', name: 'motherboard1.png'},
                        {id: 'products/motherboard2.png', name: 'motherboard2.png'},
                        {id: 'products/motherboard3.png', name: 'motherboard3.png'},
                        {id: 'products/power1.png', name: 'power1.png'},
                        {id: 'products/power2.png', name: 'power2.png'},
                        {id: 'products/ram1.png', name: 'ram1.png'},
                        {id: 'products/ram2.png', name: 'ram2.png'},
                    ]}/>
                </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput source="features">
                <SimpleFormIterator>
                    <SelectInput source="code" choices={[
                        {id: ProductFeatureCodeEnum.CLOCK, name: 'Clock'},
                        {id: ProductFeatureCodeEnum.CORES, name: 'Cores'},
                        {id: ProductFeatureCodeEnum.DISPLAY_PORT, name: 'Display port'},
                        {id: ProductFeatureCodeEnum.HDMI_PORT, name: 'HDMI port'},
                        {id: ProductFeatureCodeEnum.INTEGRATED_GRAPHICS, name: 'Integrated graphics'},
                        {id: ProductFeatureCodeEnum.MEMORY_SIZE, name: 'Memory size'},
                        {id: ProductFeatureCodeEnum.MEMORY_TYPE, name: 'Memory type'},
                        {id: ProductFeatureCodeEnum.PCI, name: 'PCI Port'},
                        {id: ProductFeatureCodeEnum.PCI_CONNECTOR, name: 'PCI Connector'},
                        {id: ProductFeatureCodeEnum.PROCESSOR, name: 'Processor'},
                        {id: ProductFeatureCodeEnum.PRODUCER, name: 'Producer'},
                        {id: ProductFeatureCodeEnum.SOCKET, name: 'Socket'},
                    ]}/>
                    <TextInput source="value"/>
                </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput source="requirements">
                <SimpleFormIterator>
                    <SelectInput source="code" choices={[
                        {id: ProductFeatureCodeEnum.CLOCK, name: 'Clock'},
                        {id: ProductFeatureCodeEnum.CORES, name: 'Cores'},
                        {id: ProductFeatureCodeEnum.DISPLAY_PORT, name: 'Display port'},
                        {id: ProductFeatureCodeEnum.HDMI_PORT, name: 'HDMI port'},
                        {id: ProductFeatureCodeEnum.INTEGRATED_GRAPHICS, name: 'Integrated graphics'},
                        {id: ProductFeatureCodeEnum.MEMORY_SIZE, name: 'Memory size'},
                        {id: ProductFeatureCodeEnum.MEMORY_TYPE, name: 'Memory type'},
                        {id: ProductFeatureCodeEnum.PCI, name: 'PCI Port'},
                        {id: ProductFeatureCodeEnum.PCI_CONNECTOR, name: 'PCI Connector'},
                        {id: ProductFeatureCodeEnum.PROCESSOR, name: 'Processor'},
                        {id: ProductFeatureCodeEnum.PRODUCER, name: 'Producer'},
                        {id: ProductFeatureCodeEnum.SOCKET, name: 'Socket'},
                    ]}/>
                    <TextInput source="value"/>
                </SimpleFormIterator>
            </ArrayInput>
            <RichTextInput source="description"/>
        </SimpleForm>
    </Edit>
);