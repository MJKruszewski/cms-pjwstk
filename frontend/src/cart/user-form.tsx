import React, {FC, useState} from "react";
import {Button, Card, Col, Form, Input, Row} from "antd";
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

    const [isDisabled, setIsDisabled] = useState<boolean>(false)

    const [form] = Form.useForm();
    const onFinish = (): void => {
        onSubmit(form.getFieldsValue());
        setIsDisabled(true);
    };
    return (
        <Card title={'Shipping address'}
              style={styles}>
            <Form form={form}
                  layout="vertical"
                  onFinish={onFinish}>
                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item name="name"
                                   label="Name:"
                                   rules={[{required: true, message: 'Name is required'}]}>
                            <Input prefix={<UserOutlined
                                className="site-form-item-icon"/>}
                                   disabled={isDisabled}
                                   placeholder="Roman"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="surname"
                                   label="Surname:"
                                   rules={[{required: true, message: 'Surname is required'}]}>
                            <Input prefix={<UserOutlined
                                className="site-form-item-icon"/>}
                                   disabled={isDisabled}
                                   placeholder="Zawadzki"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item name="email"
                                   label="Email:"
                                   rules={[{required: true, message: 'Email is required'}]}>
                            <Input prefix={<MailOutlined className="site-form-item-icon"/>}
                                   disabled={isDisabled}
                                   placeholder="romanzawadzki@mail.com"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="phone"
                                   label="Telephone number:"
                                   rules={[{required: true, message: 'Phone number is required'}]}>
                            <Input prefix={<PhoneOutlined className="site-form-item-icon"/>}
                                   disabled={isDisabled}
                                   placeholder="888 888 888"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={24}>
                        <Form.Item name="address1"
                                   label="Address 1"
                                   rules={[{required: true, message: 'address  is required'}]}>
                            <Input prefix={<EditOutlined
                                className="site-form-item-icon"/>}
                                   disabled={isDisabled}
                                   placeholder="Jaśminowa 9"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={24}>
                        <Form.Item name="address2"
                                   label="Address 2">
                            <Input prefix={<EditOutlined className="site-form-item-icon"/>}
                                   disabled={isDisabled}
                                   placeholder="m. 32"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={8}>
                        <Form.Item name="city"
                                   label="City"
                                   rules={[{required: true, message: 'City is required'}]}>
                            <Input prefix={<EditOutlined className="site-form-item-icon"/>}
                                   disabled={isDisabled}
                                   placeholder="Warszawa"/>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="postCode"
                                   label="Post code"
                                   rules={[{required: true, message: 'Post code is required'}]}>
                            <Input prefix={<EditOutlined className="site-form-item-icon"/>}
                                   disabled={isDisabled}
                                   placeholder="00-000"/>
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item name="country"
                                   label="Country"
                                   rules={[{required: true, message: 'Country is required'}]}>
                            <Input prefix={<EditOutlined className="site-form-item-icon"/>}
                                   disabled={isDisabled}
                                   placeholder="Polska"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};
