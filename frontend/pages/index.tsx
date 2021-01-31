import React, { CSSProperties, FC, Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GenericState } from 'store/genericDataSlice';
import { RootState, useAppDispatch } from 'store/rootStore';
import { request } from 'src/news/slice';
import { request as productsRequest } from 'src/products/slice';
import { News } from '@frontendDto/news.dto';
import {
  Button,
  Card,
  Carousel,
  Drawer,
  Image,
  List,
  notification,
  PageHeader,
  Result,
  Spin,
  Steps,
  Tabs,
  Tag,
  Typography
} from 'antd';
import { Product, ProductTypeEnum } from '@frontendDto/product.dto';
import { HeartOutlined, ProfileOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import randomColor from 'randomcolor';
import { useRouter } from 'next/dist/client/router';
import { v4 as uuidv4 } from 'uuid';
import { useCookies } from 'react-cookie';
import { CartDto } from '@frontendDto/cart.dto';
import { putCart } from '@frontendSrc/cart/slice';

const { Step } = Steps;
const { TabPane } = Tabs;
const { Meta } = Card;
const { Paragraph, Text, Title } = Typography;

type SplitedArrayType = {
    [key in keyof ProductTypeEnum]: Product[];
}

// @ts-ignore
const initialSplitedArray: SplitedArrayType = {
  [typeof ProductTypeEnum.MOTHERBOARD]: [] as Product[],
  [typeof ProductTypeEnum.CPU]: [] as Product[],
  [typeof ProductTypeEnum.RAM]: [] as Product[],
  [typeof ProductTypeEnum.GPU]: [] as Product[],
  [typeof ProductTypeEnum.POWER]: [] as Product[],
  [typeof ProductTypeEnum.STORAGE]: [] as Product[],
  [typeof ProductTypeEnum.CASE]: [] as Product[]
};

const Home: FC = () => {
  const { data, status, error } = useSelector<RootState, GenericState<News[]>>(state => state.news);
  const productData = useSelector<RootState, GenericState<Product[]>>(state => state.products);
  const cartData = useSelector<RootState, GenericState<CartDto[]>>(state => state.cart);

  const dispatch = useAppDispatch();
  const [splitedArrayByType, setSplitedArrayByType] = useState<SplitedArrayType>(initialSplitedArray);
  const [stepsRender, setStepsRender] = useState<JSX.Element[]>();
  const router = useRouter();
  const [currentUuid, setCurrentUuid] = useState<string>('');
  const [cookie, setCookie] = useCookies(['cartId']);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [drawerItem, setDrawerItem] = useState<Product>(null);
  const [drawerNews, setDrawerNews] = useState<News>(null);

  useEffect(() => {
    dispatch(request());
    dispatch(productsRequest());
    setCurrentUuid(cookie.cartId || uuidv4());
  }, []);

  useEffect(() => {
    if (!cookie.cartId) {
      const now: Date = new Date();
      now.setDate(now.getDate() + 7);
      const expires = now;
      setCookie('cartId', currentUuid, { expires });
    }
  }, [currentUuid]);

  useEffect(() => {
    if (!productData.data) {
      return;
    }
    splitProductArray(productData.data);
  }, [productData]);

  const steps = !splitedArrayByType
    ? []
    : Object.keys(splitedArrayByType)
      .map((key: string) => ({
        title: key,
        content: splitedArrayByType[key] as Product[]
      }));

  const splitProductArray = async (dataToSplit: Product[]) => {
    const splited: SplitedArrayType = {} as SplitedArrayType;
    dataToSplit.map((product, index) => splited[product.type]
      ? splited[product.type] = [...splited[product.type], { key: index, ...product }]
      : splited[product.type] = [{ key: index, ...product }]
    );
    setSplitedArrayByType(splited);
    // PAWEŁ PLEASE SET THIS, SINCE REACT IS BAD FRAMEWORK
    // setStepsRender(await Promise.all(steps.map(async (item, index) => {
    //     const request = new Request(`${process.env.API_HOST}/api/v1/products/promoted/${item.title}`, {
    //         method: 'GET',
    //         headers: new Headers({'Content-Type': 'application/json'}),
    //     });
    //     const response = await fetch(request);
    //     const json = await response.json();
    //
    //     return (
    //         <TabPane tab={item.title} key={item.title}>
    //             <StepContent stepIndex={index} promo={json}/>
    //         </TabPane>
    //     );
    // })))
  };

  const handleNewsClicked = (news: News) => {
    setDrawerNews(news);
    setDrawerVisible(true);
  };

  const handleItemMoreClicked = (item: Product) => {
    // TODO: implement right drawer with product details and similiar products at the bottom
    // console.log('more', item)
    setDrawerItem(item);
    setDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
    setDrawerItem(null);
    setDrawerNews(null);
  };

  const handleWishlist = (item: Product) => {

  };

  const handleItemCartClicked = (item: Product) => {
    let productIds = [];
    let configurationIds = [];

    const request = new Request(`${process.env.API_HOST}/api/v1/carts/${currentUuid}`, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          dispatch(putCart({
            externalId: currentUuid,
            products: Array.of(...productIds, item),
            configurations: Array.of(...configurationIds)
          }));

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

          dispatch(putCart({
            externalId: currentUuid,
            products: Array.of(...productIds, item),
            configurations: Array.of(...configurationIds)
          }));

          notification.open({
            message: 'Product added to cart'
          });
        });
      })
      .catch(() => {
      });
  };

  if (status === 'loading') {
    return <Spin/>;
  }

  if (status === 'error') {
    console.log(status, data);
    return (
            <Result
                status="error"
                title="Failed while fetching data"
                subTitle="Check if mongodb is running and is populated with data from /api/v1/admin/setup"
            >
                {
                    error && (
                        <Paragraph>
                            {error}
                        </Paragraph>
                    )
                }
            </Result>
    );
  }

  const renderFeatures = (features: Product['features']) => {
    if (!features) {
      return <Paragraph type='secondary'>none</Paragraph>;
    }
    return features.map((feature, index) => (
            <Tag color={randomColor({ seed: feature.value, luminosity: 'dark' })} key={`${feature.code}-${index}`}
                 style={{ marginRight: '8px' }}>
                <Text strong>
                    {feature.value}
                </Text>
            </Tag>
    ));
  };

  const ProducerTag: FC<{ item: Product }> = ({ item }) => {
    const producerFeature = item.features.filter(feature => feature.code === 'producer').pop();

    return (
            <Tag color={randomColor({ luminosity: 'dark', seed: producerFeature.value })}>
                <Text strong>
                    {producerFeature.value}
                </Text>
            </Tag>
    );
  };

  const PriceTag: FC<{ price: string }> = ({ price }) => {
    return (
            <Fragment>
                <Tag color={randomColor({ luminosity: 'dark', hue: 'red', seed: 'price' })} className='price-tag'>
                    <Text strong style={{ marginRight: 0 }}>
                        {`${price} PLN`}
                    </Text>
                </Tag>
                <style jsx>
                    {`
            .ant-tag {
              margin-right: 0 !important;
            }
          `}
                </style>
            </Fragment>
    );
  };

  const CarouselItem: FC<{ item: Product }> = ({ item }) => {
    return (
            <div style={{ minHeight: '185px', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <img src={item.images[0].src} height='185px'/>
                <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ alignSelf: 'flex-start' }}>
                        <ProducerTag item={item}/>
                        <PriceTag price={item.price.base}/>
                        <ShoppingCartOutlined style={{ fontSize: '20px' }} key="cart"
                                              onClick={() => handleItemCartClicked(item)}/>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                        <Text strong ellipsis>{item.name}</Text>
                        <Text ellipsis>{item.description}</Text>
                    </div>
                </div>
            </div>
    );
  };

  const ListHeader: FC<{ stepIndex: number, promo?: object[] | undefined | null }> = ({ stepIndex, promo }) => {
    const contentToDisplay = promo && promo.length > 0 ? promo : (steps[stepIndex]?.content.slice(0, 9) || []);

    return (
            <div style={{
              height: '20vh',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              border: '2px dashed gold',
              borderRadius: '6px'
            }}>
                <Text strong ellipsis
                      style={{ alignSelf: 'center', color: 'gold', marginBlock: '6px' }}>{'PROMOTED PRODUCTS'}</Text>
                <Carousel autoplay dotPosition='bottom' dots={{ className: 'dot-class' }}>
                    {/* TODO: fix dots opacity - less loader ? */}
                    {
                        // @ts-ignore
                        contentToDisplay.map((item, index) => <CarouselItem key={`${item.name}-${index}`} item={item}/>)
                    }
                </Carousel>
                <style jsx>
                    {
                        `
              .dot-class li button {
                opacity: 0.65 !important;
              }
            `
                    }
                </style>
            </div>
    );
  };

  const ProductCover: FC<{ item: Product, style?: CSSProperties }> = ({ item, style }) => {
    return (
            <div style={style}>
                <div style={{ position: 'absolute' }}>
                    <img height='185px' src={item.images[0].src}/>
                </div>
                <div style={{
                  position: 'absolute',
                  paddingTop: '20px'
                }}>
                    <ProducerTag item={item}/>
                </div>
                <div style={{ visibility: 'hidden' }}>
                    <img height='185px' src={item.images[0].src}/>
                </div>
                <div style={{
                  right: -8,
                  bottom: 0,
                  position: 'absolute'
                }}>
                    <PriceTag price={item.price.base}/>
                </div>
            </div>
    );
  };

  const ItemCard: FC<{ item: Product }> = ({ item }) => (
        <Card
            cover={<ProductCover item={item}/>}
            actions={[
                <ShoppingCartOutlined key="cart" onClick={() => handleItemCartClicked(item)}/>,
                <ProfileOutlined key="ellipsis" onClick={() => handleItemMoreClicked(item)}/>,
                <HeartOutlined key="ellipsis" onClick={() => handleWishlist(item)}/>
            ]}
        >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column'
            }}>
                <Text strong ellipsis>{item.name}</Text>
            </div>
        </Card>
  );

  const StepContent: FC<{ stepIndex: number, promo?: object[] | undefined | null }> = ({ stepIndex, promo }) => (
        <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5,
              xxl: 6
            }}
            header={<ListHeader stepIndex={stepIndex} promo={promo}/>}
            dataSource={steps[stepIndex]?.content || []}
            renderItem={(item: Product) => (
                <List.Item>
                    <ItemCard item={item}/>
                </List.Item>
            )}
        />
  );

  return (
        <div>
            <PageHeader
                className="site-page-header"
                backIcon={false}
                onBack={() => null}
                title="Home Page"
                subTitle=""
            />

            <Carousel autoplay>
                {
                    data?.map((news: News, index) => (
                        <Card title={news.title}>
                            <div key={`${news.title}-${index}`} onClick={() => handleNewsClicked(news)} style={{
                              display: 'flex',
                              flexDirection: 'row',
                              margin: '20px',
                              background: '#343434',
                              cursor: 'pointer'
                            }}>
                                <img src={news.cover} height='200px'/>
                                <div style={{
                                  display: 'flex',
                                  flex: 1,
                                  flexDirection: 'column',
                                  margin: '20px'
                                }}>
                                    <div style={{
                                      display: 'flex',
                                      flexDirection: 'row'
                                    }}>
                                        <Paragraph style={{
                                          alignSelf: 'end',
                                          opacity: 0.65
                                        }}>{new Date(news.createdAt.toString()).toLocaleDateString()}</Paragraph>
                                    </div>
                                    <Paragraph style={{ alignSelf: 'stretch' }}>{news.summary}</Paragraph>
                                </div>
                            </div>
                        </Card>
                    ))
                }
            </Carousel>

            <Card>
                <Tabs tabPosition={'left'} defaultActiveKey={steps[0].title}>
                    {
                        // PW TO FIX
                        // stepsRender
                        steps.map((item, index) => (
                            <TabPane tab={item.title} key={item.title}>
                                <StepContent stepIndex={index} />
                            </TabPane>
                        ))
                    }
                </Tabs>
            </Card>

            <Drawer
                title={drawerItem?.name || drawerNews?.title}
                placement="right"
                closable={false}
                onClose={handleDrawerClose}
                visible={drawerVisible}
                width='35%'
            >
                {
                    drawerItem && (
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          height: '100%'
                        }}>
                            <Image src={drawerItem.images[0].src}/>
                            <div style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              margin: '12px'
                            }}>
                                <Paragraph type='secondary'>{drawerItem.stock.sold} people bought this item</Paragraph>
                                <Paragraph type='secondary'>Available {drawerItem.stock.free} out
                                    of {drawerItem.stock.all} <PriceTag price={drawerItem.price.base}/></Paragraph>
                            </div>
                            <Title level={4}>Description</Title>
                            <Paragraph>{drawerItem.description}</Paragraph>
                            <Title level={4}>Features</Title>
                            <div style={{ display: 'flex', flexDirection: 'row', margin: '6px 12px 12px' }}>
                                {renderFeatures(drawerItem.features)}
                            </div>
                            <Title level={4}>Requirements</Title>
                            <div style={{ display: 'flex', flexDirection: 'row', margin: '6px 12px 12px' }}>
                                {renderFeatures(drawerItem.requirements)}
                            </div>
                            <Button type='primary' size='large' style={{ width: '100%', marginTop: 'auto' }}
                                    onClick={() => handleItemCartClicked(drawerItem)}>Add to cart</Button>
                        </div>
                    )
                }
                {
                    drawerNews && (
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          height: '100%'
                        }}>
                            <Image src={drawerNews.cover}/>
                            <Title level={4}>{drawerNews.summary}</Title>
                            <div dangerouslySetInnerHTML={{ __html: drawerNews.content }}></div>
                        </div>
                    )
                }
            </Drawer>

        </div>
  );
};

export default Home;
