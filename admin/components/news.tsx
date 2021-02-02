import React, {Component} from "react";
import { NumberInput, Edit, Create, SelectInput, DateInput, SimpleForm, TextInput } from "react-admin";
import RichTextInput from 'ra-input-rich-text';

export const NewsCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <NumberInput source="order"/>
            <SelectInput source="cover" choices={[
                { id: 'news/news1.png', name: 'news1.png' },
                { id: 'news/news2.png', name: 'news2.png' },
            ]} />
            <DateInput source="createdAt"/>
            <RichTextInput source="summary"/>
            <RichTextInput source="content"/>
        </SimpleForm>
    </Create>
);
export const NewsEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <NumberInput source="order"/>
            <SelectInput source="cover" choices={[
                { id: 'news/news1.png', name: 'news1.png' },
                { id: 'news/news2.png', name: 'news2.png' },
            ]} />
            <DateInput source="createdAt"/>
            <RichTextInput source="summary"/>
            <RichTextInput source="content"/>
        </SimpleForm>
    </Edit>
);