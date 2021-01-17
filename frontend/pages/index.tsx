import React, {CSSProperties, FC, Fragment, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {GenericState} from 'store/genericDataSlice';
import {RootState, useAppDispatch} from 'store/rootStore';
import {request} from 'src/news/slice';
import {News} from '@frontendDto/news.dto';
import {Card, Carousel, Image, List, PageHeader, Result, Spin, Steps, Tabs, Tag, Typography} from 'antd';
import {Product, ProductTypeEnum} from "@frontendDto/product.dto";
import {EllipsisOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import randomColor from 'randomcolor';
import {useRouter} from "next/dist/client/router";

const {Step} = Steps;
const {TabPane} = Tabs;
const {Meta} = Card;
const {Paragraph, Text} = Typography;

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
    [typeof ProductTypeEnum.CASE]: [] as Product[],
};


const Home: FC = () => {
    const {data, status, error} = useSelector<RootState, GenericState<News[]>>(state => state.news);
    const productData = useSelector<RootState, GenericState<Product[]>>(state => state.products);

    const dispatch = useAppDispatch();
    const [splitedArrayByType, setSplitedArrayByType] = useState<SplitedArrayType>(initialSplitedArray);
    const [promoted, setPromoted] = useState<Product[]>([]);
    const router = useRouter();

    useEffect(() => {
        dispatch(request());
    }, [])

    useEffect(() => {
        if (!productData.data) {
            return;
        }
        splitProductArray(productData.data);
    }, [productData]);

    const splitProductArray = (dataToSplit: Product[]) => {
        let splited: SplitedArrayType = {} as SplitedArrayType;
        dataToSplit.map((product, index) => splited[product.type]
            ? splited[product.type] = [...splited[product.type], {key: index, ...product}]
            : splited[product.type] = [{key: index, ...product}]
        );
        setSplitedArrayByType(splited)
    };

    const steps = !splitedArrayByType
        ? []
        : Object.keys(splitedArrayByType)
            .map((key: string) => ({
                title: key,
                content: splitedArrayByType[key] as Product[]
            }));

    const handleNewsClicked = (news: News) => {
        console.log('>>> clicked', news)
    }

    const handleItemMoreClicked = (item: Product) => {
        // TODO: implement right drawer with product details and similiar products at the bottom
        console.log('more', item)
    };

    const handleItemCartClicked = (item: Product) => {
        // TODO: implement cart functionallity on front
        console.log('cart', item)
    };

    if (status === 'loading') {
        return <Spin/>
    }

    if (status === 'error') {
        console.log(status, data)
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
        )
    }

    const ProducerTag: FC<{ item: Product }> = ({item}) => {
        const producerFeature = item.features.filter(feature => feature.code === 'producer').pop();

        return (
            <Tag color={randomColor({luminosity: 'dark', seed: producerFeature.value})}>
                <Text strong>
                    {producerFeature.value}
                </Text>
            </Tag>
        )
    };

    const PriceTag: FC<{ price: string }> = ({price}) => {

        return (
            <Fragment>
                <Tag color={randomColor({luminosity: 'dark', hue: 'red', seed: 'price'})} className='price-tag'>
                    <Text strong style={{marginRight: 0}}>
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
        )
    };

    const CarouselItem: FC<{ item: Product }> = ({item}) => {
        return (
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <Image src={item.images[0].src} width='14vh'/>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{alignSelf: 'flex-start'}}>
                        <ProducerTag item={item}/>
                    </div>
                    <div style={{flex: 1, display: 'flex', flexDirection: 'column', marginTop: '10px'}}>
                        <Text strong ellipsis>{item.name}</Text>
                        <Text ellipsis>{item.description}</Text>
                    </div>
                    <div style={{alignSelf: 'flex-end'}}>
                        <PriceTag price={item.price.base}/>
                    </div>
                </div>
            </div>
        )
    };


    const ListHeader: FC<{ stepIndex: number }> = ({stepIndex}) => {
        const contentToDisplay = promoted && promoted.length > 0 ? promoted : (steps[stepIndex]?.content.slice(0, 9) || []);
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
                      style={{alignSelf: 'center', color: 'gold', marginBlock: '6px'}}>{'PROMOTED PRODUCTS'}</Text>
                <Carousel autoplay dotPosition='bottom' dots={{className: 'dot-class'}}>
                    {/* TODO: fix dots opacity - less loader ? */}
                    {
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

    const ProductCover: FC<{ item: Product, style?: CSSProperties }> = ({item, style}) => {
        return (
            <div style={style}>
                <div style={{position: 'absolute'}}>
                    <Image width='256px' height='185px'
                           style={{height: '185px', maxHeight: '185px', minHeight: '185px'}} src={item.images[0].src}/>
                </div>
                <div style={{
                    position: 'absolute',
                    paddingTop: '20px'
                }}>
                    <ProducerTag item={item}/>
                </div>
                <div style={{visibility: 'hidden'}}>
                    <Image width='256px' height='185px'
                           style={{height: '185px', maxHeight: '185px', minHeight: '185px'}} src={item.images[0].src}/>
                </div>
                <div style={{
                    right: -8,
                    bottom: 0,
                    position: 'absolute'
                }}>
                    <PriceTag price={item.price.base}/>
                </div>
            </div>
        )
    };

    const ItemCard: FC<{ item: Product }> = ({item}) => (
        <Card
            cover={<ProductCover item={item}/>}
            actions={[
                <ShoppingCartOutlined key="cart" onClick={() => handleItemCartClicked(item)}/>,
                <EllipsisOutlined key="ellipsis" onClick={() => handleItemMoreClicked(item)}/>,
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

    const StepContent: FC<{ stepIndex: number }> = ({stepIndex}) => (
        <List
            grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 3,
                lg: 4,
                xl: 5,
                xxl: 6,
            }}
            header={<ListHeader stepIndex={stepIndex}/>}
            dataSource={steps[stepIndex]?.content || []}
            renderItem={(item: Product) => (
                <List.Item>
                    <ItemCard item={item}/>
                </List.Item>
            )}
        />
    )

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
                                     margin: '20px',
                                 }}>
                                     <div style={{
                                         display: 'flex',
                                         flexDirection: 'row',
                                     }}>
                                         <Paragraph style={{
                                             alignSelf: 'end',
                                             opacity: .65
                                         }}>{new Date(news.createdAt.toString()).toLocaleDateString()}</Paragraph>
                                     </div>
                                     <Paragraph style={{alignSelf: 'stretch'}}>{news.summary}</Paragraph>
                                 </div>
                             </div>
                         </Card>
                    ))
                }
            </Carousel>


            <Card>
                <Tabs tabPosition={'left'} defaultActiveKey={steps[0].title}>
                    {
                        steps.map((item, index) => (
                            <TabPane tab={item.title} key={item.title}>
                                <StepContent stepIndex={index}/>
                            </TabPane>
                        ))
                    }
                </Tabs>
            </Card>

        </div>
    );
};

export default Home;
