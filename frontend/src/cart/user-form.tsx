import React, {FC} from "react";
import {Button, Card, Col, Form, Input, Row, Table} from "antd";
import {type} from "os";
import {EditOutlined, MailOutlined, PhoneOutlined, UserOutlined} from "@ant-design/icons";

const styles = {
    width: '70%',
    margin: '5em',
};

interface OnChangeHandler {
    (e): void;
}

interface MyInputProps {
    onSubmit: OnChangeHandler;
}

export const UserForm: FC<MyInputProps> = ({onSubmit}: MyInputProps) => {
    const [form] = Form.useForm();
    const onFinish = (): void => {
        onSubmit(form.getFieldsValue());
    };
    return (
        <Card title={'Shipping address'}
              style={styles}>
            <Form layout="vertical">
                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item name="name"
                                   label="Name:"
                                   rules={[{required: true, message: 'Imię jest wymagane'}]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                                   placeholder="Roman"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="surname"
                                   label="Surname:"
                                   rules={[{required: true, message: 'Nazwisko jest wymagane'}]}>
                            <Input prefix={<UserOutlined
                                className="site-form-item-icon"/>}
                                   placeholder="Zawadzki"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={12}>
                <Col span={12}>
                        <Form.Item name="Email"
                                   label="Email:"
                                   rules={[{required: true, message: 'Email jest wymagany'}]}>
                            <Input prefix={<MailOutlined className="site-form-item-icon"/>}
                                   placeholder="romanzawadzki@mail.com"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="phone"
                                   label="Telephone number:"
                                   rules={[{required: true, message: 'Numer telefonu jest wymagany'}]}>
                            <Input prefix={<PhoneOutlined className="site-form-item-icon"/>}
                                   placeholder="888 888 888"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={12}>
                <Col span={24}>
                        <Form.Item name="address1"
                                   label="Adres 1"
                                   rules={[{required: true, message: 'Adres jest wymagany'}]}>
                            <Input prefix={<EditOutlined
                                className="site-form-item-icon"/>}
                                   placeholder="Jaśminowa 9"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={24}>
                        <Form.Item name="address2"
                                   label="Adres 2">
                            <Input prefix={<EditOutlined className="site-form-item-icon"/>}
                                   placeholder="m. 32"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={12}>
                <Col span={8}>
                        <Form.Item name="city"
                                   label="Miasto"
                                   rules={[{required: true, message: 'Miasto jest wymagane'}]}>
                            <Input prefix={<EditOutlined className="site-form-item-icon"/>}
                                   placeholder="Warszawa"/>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="post-code"
                                   label="Kod pocztowy"
                                   rules={[{required: true, message: 'Kod Pocztowy jest wymagany'}]}>
                            <Input prefix={<EditOutlined className="site-form-item-icon"/>}
                                   placeholder="00-000"/>
                        </Form.Item>
                    </Col>
                <Col span={10}>
                        <Form.Item name="Country"
                                   label="Kraj"
                                   rules={[{required: true, message: 'Kraj jest wymagany'}]}>
                            <Input prefix={<EditOutlined className="site-form-item-icon"/>}
                                   placeholder="Polska"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                </Row>

            </Form>
        </Card>
    );
};
