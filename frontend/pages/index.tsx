import React, { CSSProperties, FC, Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GenericState } from 'store/genericDataSlice';
import { RootState, useAppDispatch } from 'store/rootStore';
import { request } from 'src/news/slice';
import { request as productsRequest } from 'src/products/slice';
import { News } from '@frontendDto/news.dto';
import {
  Breadcrumb,
  Button,
  Card,
  Carousel,
  Col,
  Collapse,
  Drawer,
  Image,
  List,
  notification,
  PageHeader,
  Result,
  Row,
  Select,
  Spin,
  Tabs,
  Tag,
  Typography
} from 'antd';
import { Product, ProductTypeEnum } from '@frontendDto/product.dto';
import { HeartFilled, HeartOutlined, ProfileOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import randomColor from 'randomcolor';
import { useRouter } from 'next/dist/client/router';
import { v4 as uuidv4 } from 'uuid';
import { useCookies } from 'react-cookie';
import { CartDto } from '@frontendDto/cart.dto';
import { putCart } from '@frontendSrc/cart/slice';
import { renderFeatures } from './configurations/create';

const { Panel } = Collapse;
const { TabPane } = Tabs;
const { Paragraph, Text, Title } = Typography;
const { Option } = Select;

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
  const [cookie, setCookie] = useCookies(['cartId', 'wishListed']);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [drawerItem, setDrawerItem] = useState<Product>(null);
  const [drawerNews, setDrawerNews] = useState<News>(null);
  const [filters, setFilters] = useState<any>({});
  const [currentContent, setCurrentContent] = useState([])
  const [originalSteps, setOriginalSteps] = useState([])

  useEffect(() => {
    dispatch(request());
    dispatch(productsRequest());
    setCurrentUuid(cookie.cartId || uuidv4());
    setFilters({})
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

  useEffect(() => {
    const newOriginalSteps = !splitedArrayByType
    ? []
    : Object.keys(splitedArrayByType)
      .map((key: string) => ({
        title: key,
        content: splitedArrayByType[key] as Product[]
      }));

    setOriginalSteps(newOriginalSteps)
    setCurrentContent(newOriginalSteps[0].content)
  }, [splitedArrayByType])

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
    setDrawerItem(item);
    setDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
    setDrawerItem(null);
    setDrawerNews(null);
  };

  const handleWishlist = (item: Product) => {
    let tmp = [];
    const now: Date = new Date();
    now.setDate(now.getDate() + 90);
    const expires = now;

    if (cookie.wishListed) {
      tmp = cookie.wishListed;
    }

    // @ts-ignore
    tmp.push(item._id);

    setCookie('wishListed', tmp, { expires: expires });

    notification.open({
      message: 'Product added to wishlist'
    });
  };

  const handleFilters = (selectedValues, key, stepIndex) => {
    const tmpFilters = {
      ...filters,
      [key]: selectedValues
    };
    let tmp = originalSteps[stepIndex]?.content || []

    Object.keys(tmpFilters)
      .filter(key => tmpFilters[key].length)
      .forEach(key => 
        tmp = tmp.filter(product => 
          product.features.some(feature => 
            feature.code === key && tmpFilters[key].includes(feature.value)
          )
        )
      )
      
    tmp = tmp.filter(i => i !== null && i !== undefined);
    
    setFilters(tmpFilters)
    setCurrentContent(tmp)
  };

  const removeWishlist = (item: Product) => {
    let tmp = [];
    const now: Date = new Date();
    now.setDate(now.getDate() + 90);
    const expires = now;

    if (cookie.wishListed) {
      tmp = cookie.wishListed;
    }

    // @ts-ignore
    tmp = tmp.filter((i) => item._id !== i);

    setCookie('wishListed', tmp, { expires: expires });

    notification.open({
      message: 'Product removed from wishlist'
    });
  };
  const wishlistItemPresent = (item: Product) => {
    let tmp = [];

    if (cookie.wishListed) {
      tmp = cookie.wishListed;
    }

    for (let i1 = 0; i1 < tmp.length; i1++) {
      const i = tmp[i1];

      // @ts-ignore
      if (item._id === i) {
        return true;
      }
    }

    return false;
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

          notification.open({
            message: 'Product added to cart'
          });

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
    return <Spin />;
  }

  if (status === 'error') {
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

  const renderDrawerFeatures = (features: Product['features']) => {
    if (!features) {
      return <Paragraph type='secondary'>none</Paragraph>;
    }
    return renderFeatures(features)
  };

  const ProducerTag: FC<{ item: Product }> = ({ item }) => {
    const producerFeature = item.features.filter(feature => feature.code === 'producer').pop();

    return (
      <Tag color={randomColor({ luminosity: 'dark', seed: producerFeature?.value })}>
        <Text strong>
          {producerFeature?.value}
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
        <img src={item.images[0].src} height='185px' />
        <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ alignSelf: 'flex-start' }}>
            <ProducerTag item={item} />
            <PriceTag price={item.price.base} />
            <ShoppingCartOutlined style={{ fontSize: '20px' }} key="cart"
              onClick={() => handleItemCartClicked(item)} />
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
      <div>
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
              contentToDisplay.map((item, index) => <CarouselItem key={`${item.name}-${index}`} item={item} />)
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
      </div>
    );
  };

  const ProductCover: FC<{ item: Product, style?: CSSProperties }> = ({ item, style }) => {
    return (
      <div style={style}>
        <div style={{ position: 'absolute' }}>
          <img height='185px' src={item.images[0].src} />
        </div>
        <div style={{
          position: 'absolute',
          paddingTop: '20px'
        }}>
          <ProducerTag item={item} />
        </div>
        <div style={{ visibility: 'hidden' }}>
          <img height='185px' src={item.images[0].src} />
        </div>
        <div style={{
          right: -8,
          bottom: 0,
          position: 'absolute'
        }}>
          <PriceTag price={item.price.base} />
        </div>
      </div>
    );
  };

  const ItemCard: FC<{ item: Product }> = ({ item }) => (
    <Card
      cover={<ProductCover item={item} />}
      actions={[
        <ShoppingCartOutlined key="cart" onClick={() => handleItemCartClicked(item)} />,
        <ProfileOutlined key="ellipsis" onClick={() => handleItemMoreClicked(item)} />,
        wishlistItemPresent(item) ? <HeartFilled key="ellipsis" onClick={() => removeWishlist(item)} /> : <HeartOutlined key="ellipsis" onClick={() => handleWishlist(item)} />
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
      dataSource={currentContent}
      renderItem={(item: Product) => (
        <List.Item>
          <ItemCard item={item} />
        </List.Item>
      )}
    />
  );

  const FilterList: FC<{ stepIndex: number }> = ({ stepIndex }) => {
    const items = originalSteps[stepIndex]?.content || [];
    const tmp: any = {};
    let duplicates = [];

    items.forEach(item => {
      item.features.forEach(feature => {
        if (tmp[feature.code] === undefined || tmp[feature.code] === null) {
          tmp[feature.code] = []
        }

        if (duplicates.includes(feature.value)) {
          return;
        }

        tmp[feature.code].push(<Option key={feature.code + uuidv4() + feature.value} value={feature.value} >{feature.value}</Option>);
        tmp[feature.code] = tmp[feature.code].filter((value, index, self) => self.indexOf(value) === index);

        duplicates.push(feature.value);
      })
    })


    return (
      <Collapse ghost>
        <Panel style={{ fontWeight: 'bold' }} header="Filters" key={1}>
          <Row gutter={16} align={'middle'} justify={'start'}>
            {
              Object.keys(tmp).map(key => {
                const tmpKey = key.replace(/([a-z])([A-Z])/g, '$1 $2');

                return (
                    <Col span={4} key={`${key}-col`}>
                      <Title level={5}>{tmpKey.charAt(0).toUpperCase() + tmpKey.slice(1).toLowerCase()}: </Title>
                      <Select
                          mode="multiple"
                          allowClear
                          style={{width: '100%'}}
                          placeholder="Please select"
                          defaultValue={filters[key]}
                          onChange={(item) => handleFilters(item, key, stepIndex)}
                      >
                        {
                          tmp[key]
                        }
                      </Select>
                    </Col>
                );
              })
            }
          </Row>
        </Panel>
      </Collapse>
    );
  };
  
  const handleTabChange = (params) => setCurrentContent(steps.find(step => step.title === params).content);

  return (
    <div>
      <PageHeader
        className="site-page-header"
        backIcon={false}
        onBack={() => null}
        title="Home Page"
        subTitle=""
      />

      <Breadcrumb style={{ marginBottom: "1em" }}>
        <Breadcrumb.Item>
          <a href="">Home</a>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Carousel autoplay>
        {
          data?.map((news: News, index) => (
            <Card title={news.title} key={`${index}-card`}>
              <div key={`${news.title}-${index}`} onClick={() => handleNewsClicked(news)} style={{
                display: 'flex',
                flexDirection: 'row',
                margin: '20px',
                background: '#343434',
                cursor: 'pointer'
              }}>
                <img src={news.cover} height='200px' />
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
                  <Paragraph style={{ alignSelf: 'stretch' }}><div dangerouslySetInnerHTML={{ __html: news.summary }}></div></Paragraph>
                </div>
              </div>
            </Card>
          ))
        }
      </Carousel>

      <Card>
        <Tabs tabPosition={'left'} defaultActiveKey={steps[0].title} onChange={handleTabChange}>
          {
            // PW TO FIX
            // stepsRender
            steps.map((item, index) => (
              <TabPane tab={item.title.charAt(0).toUpperCase() + item.title.slice(1)} key={item.title}>
                <ListHeader stepIndex={index} />
                <FilterList stepIndex={index} />
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
              <Image src={drawerItem.images[0].src} />
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: '12px'
              }}>
                <Paragraph type='secondary'>{drawerItem.stock.sold} people bought this item</Paragraph>
                <Paragraph type='secondary'>Available {drawerItem.stock.free} out
                                    of {drawerItem.stock.all} <PriceTag price={drawerItem.price.base} /></Paragraph>
              </div>
              <Title level={4}>Description</Title>
              <Paragraph>{drawerItem.description}</Paragraph>
              <Title level={4}>Features</Title>
              <div style={{ display: 'flex', flexDirection: 'row', margin: '6px 12px 12px' }}>
                {renderDrawerFeatures(drawerItem.features)}
              </div>
              <Title level={4}>Requirements</Title>
              <div style={{ display: 'flex', flexDirection: 'row', margin: '6px 12px 12px' }}>
                {renderDrawerFeatures(drawerItem.requirements)}
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
              <Image src={drawerNews.cover} />
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
