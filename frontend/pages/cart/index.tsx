import { getCart, postPayment, putCart } from '@frontendSrc/cart/slice';
import { GenericState } from '@frontendStore/genericDataSlice';
import { RootState, useAppDispatch } from '@frontendStore/rootStore';
import React, { FC, useEffect, useState } from 'react';
import randomColor from 'randomcolor';
import { useSelector } from 'react-redux';
import { Alert, Button, Col, Form, notification, PageHeader, Row, Table, Tag, Typography } from 'antd';
import { Product } from '@frontendDto/product.dto';
import { useRouter } from 'next/router';
import { CartDto } from '@frontendDto/cart.dto';
import { useCookies } from 'react-cookie';
import { v4 as uuidv4 } from 'uuid';
import { ShippingMethods } from '@frontendSrc/cart/shipping-methods';
import { UserForm } from '@frontendSrc/cart/user-form';
import { User } from '@frontendDto/user.dto';
import { ShippingMethod } from '@frontendDto/shipping-method.dto';
import { DeleteOutlined } from '@ant-design/icons';

const { Text } = Typography;

const Cart: FC = () => {
  const { data, status, error } = useSelector<RootState, GenericState<CartDto>>(state => state.cart);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [userForm] = Form.useForm();

  const [tagsPallete, setTagsPallete] = useState<Record<string, string>>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0.00);
  const [userData, setUserData] = useState<User>(null);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>(null);
  const [cookie, setCookie] = useCookies(['cartId']);

  useEffect(() => {
    if (!cookie.cartId) {
      const now: Date = new Date();
      now.setDate(now.getDate() + 7);
      const expires = now;
      setCookie('cartId', uuidv4(), { expires });
    }

    dispatch(getCart(cookie.cartId));
  }, []);

  const onUserFormSubmit = (user: User): void => {
    setUserData(user);
    console.log(user);
  };

  const onFinalizationSubmit = (): void => {
    userForm.submit();

    if (products.length > 0 && userData) {
      dispatch(postPayment({
        user: userData,
        shippingMethod: shippingMethod,
        orderId: 'sb',
        configurations: [data]
      }));

      const now: Date = new Date();
      now.setDate(now.getDate() + 7);
      const expires = now;
      setCookie('cartId', uuidv4(), { expires });
      dispatch(putCart({
        externalId: cookie.cartId,
        products: [],
        configurations: []
      }));

      router.push('/success-page');
    }
  };

  const createColorPalleteForTags = (dataToSplit: Product[]) => {
    const newPallete: Record<string, string> = {};
    dataToSplit.forEach(product =>
      product.features.forEach(feature =>
        !newPallete[feature.value]
          ? newPallete[feature.value] = randomColor({ luminosity: 'dark' })
          : newPallete[feature.value] = newPallete[feature.value]
      )
    );

    setTagsPallete(newPallete);
  };

  useEffect(() => {
    if (!data || !data.products || !data.configurations) {
      return;
    }
    let localProducts = Array.of(...data.products);

    data.configurations.forEach(config => {
      localProducts = Array.of(...localProducts, ...data.components);
    });

    setProducts(localProducts);

    let total = 0;
    data.products.forEach((product) => {
      total += parseFloat(product.price.base);
    });

    setTotalAmount(total);

    createColorPalleteForTags(products);
  }, [data]);

  const renderFeatures = (features: Product['features']) => {
    return features.map((feature, index) => (
            <Tag color={tagsPallete[feature.value] || randomColor()} key={`${feature.code}-${index}`}>
                <Text strong>
                    {feature.value}
                </Text>
            </Tag>
    ));
  };
  const removeProductFromCart = (product: Product) => {
    let productIds = [];
    let configurationIds = [];

    const request = new Request(`${process.env.API_HOST}/api/v1/carts/${cookie.cartId}`, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          dispatch(getCart(cookie.cartId));

          return;
        }

        response.json().then((resp) => {
          // @ts-ignore
          resp.products.forEach(item => {
            if (item._id) {
              productIds.push(item._id);
            }
          });
          // @ts-ignore
          resp.configurations.forEach(item => {
            if (item._id) {
              configurationIds.push(item._id);
            }
          });

          if (!productIds || !Array.isArray(productIds)) {
            productIds = [];
          }

          if (!configurationIds || !Array.isArray(configurationIds)) {
            configurationIds = [];
          }

          configurationIds = configurationIds.map(id => {
            return {
              _id: id
            };
          });

          productIds = productIds.map(id => {
            return {
              _id: id
            };
          });

          for (let key = 0; key < productIds.length; key++) {
            const item = productIds[key];
            // @ts-ignore
            if (item._id === product._id) {
              delete productIds[key];
              break;
            }
          }
          productIds = productIds.filter((item) => item !== null && item !== undefined);

          dispatch(putCart({
            externalId: cookie.cartId,
            products: Array.of(...productIds),
            configurations: Array.of(...configurationIds)
          }));

          dispatch(getCart(cookie.cartId));

          notification.open({
            message: 'Product removed from cart'
          });
        });
      })
      .catch(() => {});
  };
  const renderActions = (product: Product) => {
    return <DeleteOutlined style={{ color: 'red' }} onClick={() => removeProductFromCart(product)} />;
  };
  const columns = [
    { title: '', width: 35, key: 'actions', render: renderActions },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Price', dataIndex: 'price', key: 'price', render: price => parseFloat(price.base).toFixed(2) + ' PLN' },
    { title: 'Features', dataIndex: 'features', key: 'features', render: renderFeatures }
  ];

  return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto'
        }}>
            <PageHeader
                className="site-page-header"
                onBack={() => router.back()}
                title="Cart"
                subTitle=""
            />

            <Alert message="Remember, adding product to cart does not means it is reserved for you!" type="info"
                style={{ marginBottom: '25px' }} />
            <Table
                style={{ marginLeft: '5em', marginRight: '5em' }}
                pagination={false}
                columns={columns}
                dataSource={products}
                loading={status === 'loading'}
                scroll={{ y: 250 }}
                title={() => <b>Cart</b>}
                footer={() => <div style={{ display: 'inline' }}>Total price: <b>{totalAmount.toFixed(2) + ' PLN'}</b>
                </div>}
            />

            <div style={{ display: 'flex' }}>
                <UserForm userForm={userForm} onSubmit={onUserFormSubmit} />
                <ShippingMethods shippingMethod={shippingMethod} setShippingMethod={setShippingMethod} />
            </div>

            <Row align={'middle'} justify={'center'}>
                <Col span={6} style={{ textAlign: 'center' }}>
                    <Button onClick={onFinalizationSubmit}
                            style={{ marginBottom: '1em', width: '300px', fontWeight: 'bold', height: '40px' }}
                            type="primary">
                        Finalize without payment
                    </Button>
                </Col>
            </Row>
        </div>
  );
};

export default Cart;
