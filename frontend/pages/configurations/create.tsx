import { Product, ProductTypeEnum } from '@frontendDto/product.dto';
import {Breadcrumb, Button, notification, PageHeader, Result, Spin, Steps, Table, Tag, Typography} from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { postConfiguration, request } from 'src/products/slice';
import { GenericState } from 'store/genericDataSlice';
import { RootState, useAppDispatch } from 'store/rootStore';
import { v4 as uuidv4 } from 'uuid';
import randomColor from 'randomcolor';
import { useRouter } from 'next/dist/client/router';
import { useCookies } from 'react-cookie';
import {putCart} from "@frontendSrc/cart/slice";

const { Step } = Steps;
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
  [typeof ProductTypeEnum.CASE]: [] as Product[]
};

export const getUniqueFeatures = (features: any) => {
  if (features === undefined) {
    return [];
  }

  return features.filter((thing, index) => {
    const _thing = JSON.stringify(thing);

    return index === features.findIndex(obj => {
      return JSON.stringify(obj) === _thing;
    });
  });
};

export const renderFeatures = (features: Product['features']) => {
  const uniqueArray = getUniqueFeatures(features)

  return uniqueArray.map((feature, index) => (
    <Tag color={randomColor({ seed: feature.value, luminosity: 'dark' })} key={`${feature.code}-${index}`} style={{ marginRight: '8px', marginBottom: '8px' }}>
      <Text strong>
        {feature.value}
      </Text>
    </Tag>
  ))
};

const Products: FC = () => {
  const { data, status, error } = useSelector<RootState, GenericState<Product[]>>(state => state.products);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [splitedArrayByType, setSplitedArrayByType] = useState<SplitedArrayType>(initialSplitedArray);
  const [selectedProducts, setSelectedProducts] = useState<Record<ProductTypeEnum, Product>>({} as Record<ProductTypeEnum, Product>);
  const [currentUuid, setCurrentUuid] = useState<string>('');
  const [buttonLock, setButtonLock] = useState<boolean>(true);
  const [cookie, setCookie] = useCookies(['cartId']);
  const [currentlySelectedKey, setCurrentlySelectedKey] = useState<number>()

  useEffect(() => {
    dispatch(request());
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
    if (!data) {
      return;
    }
    splitProductArray(data);
  }, [data]);

  useEffect(() => {
    const step = steps[currentStep]
    let sumOfElementsBefore = 0;
    for (let index = 0; index < currentStep; index++) {
      sumOfElementsBefore += steps[index].content.length;
    }
    const selectedProduct = step.content[currentlySelectedKey - sumOfElementsBefore] as Product

    if (!selectedProduct) {
      const defaultProduct = steps[currentStep].content[0] as Product;
      defaultProduct && setSelectedProducts({
        ...selectedProducts,
        [defaultProduct.type]: undefined
      });
      return;
    }
    const newSelectedProducts = {
      ...selectedProducts,
      [selectedProduct.type]: selectedProduct
    }

    setSelectedProducts(newSelectedProducts);
  }, [currentlySelectedKey])

  // useEffect(() => {
  //   console.log('!!! selectedProducts', selectedProducts)
  // }, [selectedProducts])

  const splitProductArray = (dataToSplit: Product[]) => {
    const splited: SplitedArrayType = {} as SplitedArrayType;
    dataToSplit.map((product, index) => splited[product.type]
      ? splited[product.type] = [...splited[product.type], { key: index, ...product }]
      : splited[product.type] = [{ key: index, ...product }]
    );
    setSplitedArrayByType(splited);
  };

  const submit = () => {
    setButtonLock(true);
    const components = Object.keys(selectedProducts).map(key => selectedProducts[key]);
    const externalId = uuidv4();

    fetch(`${process.env.API_HOST}/api/v1/configurations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        externalId: externalId,
        components: components
      })
    }).then(response => {
      response.json().then(json => {
        handleItemCartClicked(json._id);
      }).catch(() => {})
    }).catch(() => {})
  };

  const handleItemCartClicked = (externalId) => {
    let productIds = [];
    let configurationIds = [];

    const request = new Request(`${process.env.API_HOST}/api/v1/carts/${cookie.cartId}`, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    fetch(request)
        .then(response => {
          if (response.status < 200 || response.status >= 300) {
            dispatch(putCart({
              externalId: cookie.cartId,
              products: Array.of(...productIds),
              configurations: Array.of(...configurationIds, {_id: externalId})
            }));

            notification.open({
              message: 'Product added to cart'
            });

            router.push({
              pathname: '/cart'
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
              externalId: cookie.cartId,
              products: Array.of(...productIds),
              configurations: Array.of(...configurationIds, {_id: externalId})
            }));

            notification.open({
              message: 'Product added to cart'
            });

            router.push({
              pathname: '/cart'
            });
          });
        })
        .catch(() => {
        });
  };


  const steps = !splitedArrayByType
    ? []
    : Object.keys(splitedArrayByType)
      .map((key: string) => ({
        title: key,
        content: splitedArrayByType[key],
        filters: getUniqueFeatures(splitedArrayByType[key].map(product => product.features).flat())
      }));

  const getFilters = () => steps[currentStep].filters.map(filter => ({ text: filter.value, value: JSON.stringify(filter) }))
  // const handleOnFilter = (value, record) => console.log('@@@ onFilter', value, record)
  const handleOnFilter = (value, record) => record.features.findIndex(feature => JSON.stringify(feature) === value) >= 0
  
  const columns = [
    { title: '', dataIndex: 'images', key: 'image', render: images => <img src={`/${images[0].src}`} height='120px' /> },
    { title: 'Name', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0 },
    { title: 'Price', dataIndex: 'price', key: 'price', render: price => parseFloat(price.base).toFixed(2) + ' PLN', sorter: (a, b) => Number(a.price.base) - Number(b.price.base) },
    { title: 'Features', dataIndex: 'features', key: 'features', render: renderFeatures, filters: getFilters(), onFilter: handleOnFilter, }
  ];

  const rowSelection = {
    onChange: (_selectedRowKeys, selectedRows) => {
      setSelectedProducts({
        ...selectedProducts,
        [selectedRows[0].type]: selectedRows[0]
      });
    },
    type: 'radio' as const,
    hideSelectAll: true,
    preserveSelectedRowKeys: true,
    selectedRowKeys: [currentlySelectedKey]
  };

  const getStepStatus = (index: number) => {
    const step = steps[index]
    const hasProperty = selectedProducts.hasOwnProperty(step.title);
    const hasSelestedItem = !!selectedProducts[step.title]

    if (currentStep === index) return 'process'

    return hasSelestedItem
      ? 'finish'
      : hasProperty
        ? 'error'
        : 'wait'
  }

  const getStepDesc = (index: number) => {
    const step = steps[index]
    const hasProperty = selectedProducts.hasOwnProperty(step.title);
    const hasSelectedItem = !!selectedProducts[step.title]
    const selectedItem = selectedProducts[step.title] as Product

    if (currentStep === index) return 'choosing... ' + (selectedItem?.name || '')

    return !hasProperty
      ? 'waiting...'
      : !hasSelectedItem
        ? 'empty slot'
        : selectedItem.name
  }

  if (status === 'loading') {
    return <Spin />;
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
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto'
    }}>
      <PageHeader
        className="site-page-header"
        onBack={() => router.back()}
        title="Configure PC"
        subTitle=""
      />

      <Breadcrumb style={{marginBottom: "1em"}}>
        <Breadcrumb.Item>
          <a href="/">Home</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Configurations</a>
        </Breadcrumb.Item>
      </Breadcrumb>

      <div style={{
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        height: '85vh'
      }}>
        <div style={{
          margin: '24px',
          maxWidth: '25vw',
          height: '83vh',
          display: 'flex',
          flex: 1,
          flexDirection: 'column'
        }}>
          <Steps
            current={currentStep}
            direction='vertical'
            onChange={(current) => setCurrentStep(current)}
            style={{
              height: '80vh'
            }}
          >
            {steps.map((item, index) => (
              <Step key={item.title} title={item.title.toUpperCase()} description={getStepDesc(index)} status={getStepStatus(index)} />
            ))}
          </Steps>
          <Button
            type='primary'
            size='large'
            disabled={Object.keys(selectedProducts).length !== steps.length}
            style={{
              marginTop: 'auto'
            }}
            onClick={submit}
          >
            Add configuration to cart
          </Button>
        </div>
        <div style={{
          maxWidth: '75vw'
        }}>
          <Table
            pagination={false}
            columns={columns}
            expandable={{
              expandedRowRender: record => (
                <div style={{ display: 'inline' }}>
                  <p style={{ margin: 0 }}>{record.description}</p>
                </div>
              )
            }}
            onRow={(r) => ({
              onClick: () => currentlySelectedKey !== r.key ? setCurrentlySelectedKey(r.key) : setCurrentlySelectedKey(-1),
            })}
            dataSource={steps[currentStep].content}
            loading={status === 'loading'}
            scroll={{ y: 1050 }}
            rowSelection={rowSelection}
          />
        </div>
      </div>
      {/* {stepActions} */}
    </div>
  );
};

export default Products;
