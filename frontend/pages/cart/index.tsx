import { getCart, postPayment, putCart } from '@frontendSrc/cart/slice';
import { GenericState } from '@frontendStore/genericDataSlice';
import { RootState, useAppDispatch } from '@frontendStore/rootStore';
import React, { FC, useEffect, useState } from 'react';
import randomColor from 'randomcolor';
import { useSelector } from 'react-redux';
import {Alert, Breadcrumb, Button, Col, Form, notification, PageHeader, Row, Table, Tag, Typography} from 'antd';
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
import { renderFeatures } from 'pages/configurations/create';
import {PcConfigurationDto} from "@frontendDto/configuration.dto";

const { Text } = Typography;

const Cart: FC = () => {
  const { data, status, error } = useSelector<RootState, GenericState<CartDto>>(state => state.cart);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [userForm] = Form.useForm();

  const [tagsPallete, setTagsPallete] = useState<Record<string, string>>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [configurations, setConfigurations] = useState<object[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0.00);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>(null);
  const [cookie, setCookie] = useCookies(['cartId']);

  useEffect(() => {
    if (!cookie.cartId) {
      const now: Date = new Date();
      now.setDate(now.getDate() + 7);
      const expires = now;
      setCookie('cartId', uuidv4(), { expires });
    }

    const p = dispatch(getCart(cookie.cartId));
    }, []);

  const onFinalizationSubmit = (): void => {

    const user =  userForm.getFieldsValue();

    if (data.products.length || data.configurations.length && user) {
      dispatch(postPayment({
        user,
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
    const confs = [];
    let localProducts = Array.of(...data.products);
    let allTotal = 0;


    data.configurations.forEach((conf, key) => {
      let total = 0;

      conf.components.forEach(comp => {
        total += parseFloat(comp.price.base);
      })

      allTotal += total;
      confs.push({
        ...conf,
        name: 'Configuration ' + key,
        price: {base: total},
        features: [],
        key: 'conf-' + key
      })
    })
    setConfigurations(confs);
    setProducts(localProducts);

    data.products.forEach((product) => {
      allTotal += parseFloat(product.price.base);
    });

    setTotalAmount(allTotal);

    createColorPalleteForTags(products);
  }, [data]);

  const removeProductFromCart = (product: Product|PcConfigurationDto) => {
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

          for (let key = 0; key < configurationIds.length; key++) {
            const item = configurationIds[key];
            // @ts-ignore
            if (item._id === product?._id) {
              delete configurationIds[key];
              break;
            }
          }
          configurationIds = configurationIds.filter((item) => item !== null && item !== undefined);

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
  const renderActions = (product: any) => {
    return <DeleteOutlined style={{ color: 'red' }} onClick={() => removeProductFromCart(product)} />;
  };
  const columns = [
    { title: '', width: 35, key: 'actions', render: renderActions },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Price', dataIndex: 'price', key: 'price', render: price => parseFloat(price && price.base ? price.base : 0).toFixed(2) + ' PLN' },
    { title: 'Features', dataIndex: 'features', key: 'features', render: renderFeatures }
  ];
  const columns2 = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Price', dataIndex: 'price', key: 'price', render: price => parseFloat(price && price.base ? price.base : 0).toFixed(2) + ' PLN' },
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

          <Breadcrumb style={{marginBottom: "1em"}}>
            <Breadcrumb.Item>
              <a href="/">Home</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Cart</a>
            </Breadcrumb.Item>
          </Breadcrumb>

            <Alert message="Remember, adding product to cart does not means it is reserved for you!" type="info"
                style={{ marginBottom: '25px' }} />
            <Table
                style={{ marginLeft: '5em', marginRight: '5em' }}
                pagination={false}
                columns={columns}
                expandable={{
                  expandedRowRender: record => (
                    <Table
                      style={{ marginLeft: '1em' }}
                      pagination={false}
                      columns={columns2}
                      // @ts-ignore
                      dataSource={record.components}
                      loading={status === 'loading'}
                    />
                    ),
                  // @ts-ignore
                  rowExpandable: record => record.components !== undefined,
                }}
                // @ts-ignore
                dataSource={Array.of(...products, ...configurations)}
                loading={status === 'loading'}
                scroll={{ y: 350 }}
                title={() => <b>Cart</b>}
                footer={() => <div style={{ display: 'inline' }}>Total price: <b>{totalAmount.toFixed(2) + ' PLN'}</b>
                </div>}
            />

            <div style={{ display: 'flex' }}>
                <UserForm userForm={userForm} />
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
