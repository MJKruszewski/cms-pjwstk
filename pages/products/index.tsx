import { Product, ProductTypeEnum } from '@domain/product.domain';
import { Button, message, Result, Spin, Steps, Table, Tag, Typography } from 'antd';
import React, { FC, useEffect, useState } from 'react'

import { useSelector } from 'react-redux';
import { request, postConfiguration } from 'src/products/slice';
import { GenericState } from 'store/genericDataSlice';
import { RootState, useAppDispatch } from 'store/rootStore';
import { v4 as uuidv4 } from 'uuid';
import randomColor from 'randomcolor';

const { Step } = Steps;
const { Paragraph, Text } = Typography;

type SplitedArrayType = {
  [key in keyof ProductTypeEnum]: Product[];
}

// @ts-ignore
const initialSplitedArray: SplitedArrayType = {
  [typeof ProductTypeEnum.MOTHERBOARD]: [] as Product[],
  [typeof ProductTypeEnum.PROCESSOR]: [] as Product[],
  [typeof ProductTypeEnum.RAM]: [] as Product[],
  [typeof ProductTypeEnum.GPU]: [] as Product[],
  [typeof ProductTypeEnum.POWER]: [] as Product[],
  [typeof ProductTypeEnum.STORAGE]: [] as Product[],
}

const Products: FC = () => {
  const { data, status, error } = useSelector<RootState, GenericState<Product[]>>(state => state.products);
  const dispatch = useAppDispatch();

  const [currentStep, setCurrentStep] = useState<number>(0)
  const [splitedArrayByType, setSplitedArrayByType] = useState<SplitedArrayType>(initialSplitedArray)
  const [tagsPallete, setTagsPallete] = useState<Record<string, string>>({})
  const [selectedProducts, setSelectedProducts] = useState<Record<ProductTypeEnum, Product>>({} as Record<ProductTypeEnum, Product>)
  const [currentUuid, setCurrentUuid] = useState<string>('')
  const [buttonLock, setButtonLock] = useState<boolean>(true)

  useEffect(() => {
    dispatch(request())
    setCurrentUuid(uuidv4())
  }, [])

  useEffect(() => {
    if (!data) {
      return;
    }
    splitProductArray(data)
    createColorPalleteForTags(data)
  }, [data])

  useEffect(() => {
    console.log(selectedProducts)
  }, [selectedProducts])

  const splitProductArray = (dataToSplit: Product[]) => {
    let splited: SplitedArrayType = {} as SplitedArrayType;
    dataToSplit.map((product, index) => splited[product.type]
      ? splited[product.type] = [...splited[product.type], { key: index, ...product }]
      : splited[product.type] = [{ key: index, ...product }]
    )
    setSplitedArrayByType(splited)
  }

  const createColorPalleteForTags = (dataToSplit: Product[]) => {
    let newPallete: Record<string, string> = {}
    dataToSplit.forEach(product => 
      product.features.forEach(feature =>
        !newPallete[feature.value]
          ? newPallete[feature.value] = randomColor({ luminosity: 'dark' })
          : newPallete[feature.value] = newPallete[feature.value]
      )
    )

    setTagsPallete(newPallete)
  }
  
  const next = () => {
    setButtonLock(true);
    return setCurrentStep(currentStep + 1);
  };
  const prev = () => {
    setButtonLock(true);
    return setCurrentStep(currentStep - 1);
  };
  const submit = () => {
    setButtonLock(true);
    const components = Object.keys(selectedProducts).map(key => selectedProducts[key])
    dispatch(postConfiguration({
      externalId: currentUuid,
      components
    }))
  }
  

  const steps = !splitedArrayByType
    ? []
    : Object.keys(splitedArrayByType)
      .map((key: string) => ({
        title: key,
        content: splitedArrayByType[key]
      }))

  const renderFeatures = (features: Product['features']) => {
    return features.map((feature, index) => (
      <Tag color={tagsPallete[feature.value] || randomColor()} key={`${feature.code}-${index}`}>
        <Text strong>
          {feature.value}
        </Text>
      </Tag>
    ))
  }

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Features', dataIndex: 'features', key: 'features', render: renderFeatures },
  ]
  
  const rowSelection = {
    onChange: (_selectedRowKeys, selectedRows) => {
      setButtonLock(false);

      setSelectedProducts({
        ...selectedProducts,
        [selectedRows[0].type]: selectedRows[0]
      })
    },
    getCheckboxProps: record => ({
      name: record.name,
    }),
    type: 'radio' as const
  };

  const stepActions = (
    <div style={{
      margin: '12px'
    }}>
      {currentStep < steps.length - 1 && (
        <Button type="primary" onClick={() => next()} style={{float: 'right'}} disabled={buttonLock}>
          Next
        </Button>
      )}
      {currentStep === steps.length - 1 && (
        <Button type="primary" onClick={submit} style={{float: 'right'}} disabled={buttonLock}>
          Add to cart
        </Button>
      )}
      {currentStep > 0 && (
        <Button style={{ margin: '0 8px', float: 'left' }} onClick={() => prev()}>
          Previous
        </Button>
      )}
    </div>
  )

  if (status === 'loading') {
    return <Spin />
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
    )
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto'
    }}>
      <Steps current={currentStep} style={{marginBottom: '25px'}}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>

      <div className="steps-content">
        <Table
          pagination={false}
          columns={columns}
          expandable={{
            expandedRowRender: record => <div style={{display: 'inline'}}>
              <div style={{display: 'inline'}}>
                {record.images.map(img => <img src={window.location.origin + "/" + img.src} width={'300px'} />)}
              </div>

              <br/>
              <p style={{ margin: 0 }}>{record.description}</p>
            </div>
          }}
          dataSource={steps[currentStep].content}
          loading={status === 'loading'}
          scroll={{ y: 500 }}
          rowSelection={rowSelection}
        />
      </div>
      {stepActions}
    </div>
  )
}

export default Products
