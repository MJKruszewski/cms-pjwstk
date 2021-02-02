import React from "react";
import {
    Create,
    Datagrid,
    Edit,
    List,
    NumberField,
    NumberInput,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput
} from "react-admin";

export const ShippingList = (props) => (
    <List {...props}>
        <Datagrid>
                <TextField source="name" />
                <TextField source="price" />
                <NumberField source="maxItems" />
                <NumberField source="minItems" />
                <TextField source="cover" />
        </Datagrid>
    </List>
);

export const ShippingCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name"/>
            <TextInput source="price"/>
            <NumberInput source="maxItems"/>
            <NumberInput source="minItems"/>
            <SelectInput source="cover" choices={[
                {id: 'shipping-method/dhl.png', name: 'dhl.png'},
                {id: 'shipping-method/dpd.png', name: 'dpd.png'},
                {id: 'shipping-method/fedex.png', name: 'fedex.png'},
                {id: 'shipping-method/ups.png', name: 'ups.png'},
            ]}/>
        </SimpleForm>
    </Create>
);

export const ShippingEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name"/>
            <TextInput source="price"/>
            <NumberInput source="maxItems"/>
            <NumberInput source="minItems"/>
            <SelectInput source="cover" choices={[
                {id: 'shipping-method/dhl.png', name: 'dhl.png'},
                {id: 'shipping-method/dpd.png', name: 'dpd.png'},
                {id: 'shipping-method/fedex.png', name: 'fedex.png'},
                {id: 'shipping-method/ups.png', name: 'ups.png'},
            ]}/>
        </SimpleForm>
    </Edit>
);