import {Product, ProductTypeEnum} from '../../../api/domain/product.domain';
import {Card, Carousel, Image, List, Result, Spin, Steps, Tabs, Tag, Typography} from 'antd';
import React, {CSSProperties, FC, Fragment, useEffect, useState} from 'react'
import {useSelector} from 'react-redux';
import {request} from 'src/products/slice';
import {GenericState} from 'store/genericDataSlice';
import {RootState, useAppDispatch} from 'store/rootStore';
import {v4 as uuidv4} from 'uuid';
import randomColor from 'randomcolor';
import {useRouter} from 'next/dist/client/router';
import {EllipsisOutlined, ShoppingCartOutlined} from '@ant-design/icons';

const { Step } = Steps;
const { TabPane } = Tabs;
const { Meta } = Card;
const { Paragraph, Text } = Typography;

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

const Products: FC = () => {
  const { data, status, error } = useSelector<RootState, GenericState<Product[]>>(state => state.products);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [promoted, setPromoted] = useState<Product[]>([]);
  const [splitedArrayByType, setSplitedArrayByType] = useState<SplitedArrayType>(initialSplitedArray);
  const [selectedProducts, setSelectedProducts] = useState<Record<ProductTypeEnum, Product>>({} as Record<ProductTypeEnum, Product>);
  const [currentUuid, setCurrentUuid] = useState<string>('');
  const [buttonLock, setButtonLock] = useState<boolean>(true);

  useEffect(() => {
    dispatch(request());
    setCurrentUuid(uuidv4())
  }, []);

  useEffect(() => {
    if (!data) {
      return;
    }
    splitProductArray(data);
  }, [data]);

  useEffect(() => {
    console.log(selectedProducts)
  }, [selectedProducts]);

  const splitProductArray = (dataToSplit: Product[]) => {
    let splited: SplitedArrayType = {} as SplitedArrayType;
    dataToSplit.map((product, index) => splited[product.type]
      ? splited[product.type] = [...splited[product.type], { key: index, ...product }]
      : splited[product.type] = [{ key: index, ...product }]
    );
    setSplitedArrayByType(splited)
  };

  const steps = !splitedArrayByType
    ? []
    : Object.keys(splitedArrayByType)
      .map((key: string) => ({
        title: key,
        content: splitedArrayByType[key]
      }));

  const handleItemCartClicked = (item: Product) => {
    // TODO: implement cart functionallity on front
    console.log('cart', item)
  };

  const handleItemMoreClicked = (item: Product) => {
    // TODO: implement right drawer with product details and similiar products at the bottom
    console.log('more', item)
  };

  const ProducerTag: FC<{ item: Product }> = ({ item }) => {
    const producerFeature = item.features.filter(feature => feature.code === 'producer').pop();
    
    return (
      <Tag color={randomColor({ luminosity: 'dark', seed: producerFeature.value })} >
        <Text strong>
          {producerFeature.value}
        </Text>
      </Tag>
    )
  };

  const PriceTag: FC<{ price: string }> = ({ price }) => {
    
    return (
      <Fragment>
        <Tag color={randomColor({ luminosity: 'dark', hue: 'red', seed: 'price' })} className='price-tag' >
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
    )
  };

  const ProductCover: FC<{ item: Product, style?: CSSProperties }> = ({ item, style }) => {
    return (
      <div style={style}>
        <div style={{ position: 'absolute' }}>
          <Image width='256px' height='185px' style={{height: '185px', maxHeight: '185px', minHeight: '185px' }} src={item.images[0].src} />
        </div>
        <div style={{
          position: 'absolute',
          paddingTop: '20px'
        }}>
          <ProducerTag item={item} />
        </div>
        <div style={{ visibility: 'hidden' }}>
          <Image width='256px' height='185px' style={{height: '185px', maxHeight: '185px', minHeight: '185px' }} src={item.images[0].src} />
        </div>
        <div style={{
          right: -8,
          bottom: 0,
          position: 'absolute'
        }}>
          <PriceTag price={item.price.base} />
        </div>
      </div>
    )
  };

  const CarouselItem: FC<{ item: Product }> = ({ item }) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Image src={item.images[0].src} width='14vh' />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ alignSelf: 'flex-start' }}>
            <ProducerTag item={item} />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
            <Text strong ellipsis>{item.name}</Text>
            <Text ellipsis>{item.description}</Text>
          </div>
          <div style={{ alignSelf: 'flex-end' }}>
            <PriceTag price={item.price.base} />
          </div>
        </div>
      </div>
    )
  };
  

  const ListHeader: FC<{ stepIndex: number }> = ({ stepIndex }) => {
    const contentToDisplay = promoted && promoted.length > 0 ? promoted : (steps[stepIndex]?.content.slice(0, 9) || []);
    return (
      <div style={{ height: '20vh', display: 'flex', justifyContent: 'center', flexDirection: 'column', border: '2px dashed gold', borderRadius: '6px' }} >
        <Text strong ellipsis style={{ alignSelf: 'center', color: 'gold', marginBlock: '6px' }}>{'PROMOTED PRODUCTS'}</Text>
        <Carousel autoplay dotPosition='bottom' dots={{ className: 'dot-class' }}>
          {/* TODO: fix dots opacity - less loader ? */}
          {
            contentToDisplay.map(item => <CarouselItem item={item} />)
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

  const ItemCard: FC<{ item: Product }> = ({ item }) => (
    <Card
      cover={<ProductCover item={item} />}
      actions={[
        <ShoppingCartOutlined key="cart" onClick={() => handleItemCartClicked(item)} />,
        <EllipsisOutlined key="ellipsis" onClick={() => handleItemMoreClicked(item)} />,
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

  const StepContent: FC<{ stepIndex: number }> = ({ stepIndex }) => (
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
      header={<ListHeader stepIndex={stepIndex} />}
      dataSource={steps[stepIndex]?.content || []}
      renderItem={(item: Product) => (
        <List.Item>
          <ItemCard item={item} />
        </List.Item>
      )}
    />
  )

  if (status === 'loading') {
    return <Spin />
  }

  if (status === 'error' || steps[currentStep] === undefined) {
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

  return (
    <div>
      <Tabs defaultActiveKey={steps[0].title} >
        {
          steps.map((item, index) => (
            <TabPane tab={item.title} key={item.title} >
              <StepContent stepIndex={index} />
            </TabPane>
          ))
        }
      </Tabs>
    </div>
  )
};

export default Products
