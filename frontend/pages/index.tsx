import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GenericState } from 'store/genericDataSlice';
import { RootState, useAppDispatch } from 'store/rootStore';
import { request } from 'src/news/slice';
import { News } from '@frontendDto/news.dto';
import { Card, Image, Result, Spin } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';

const Home: FC = () => {
  const { data, status, error } = useSelector<RootState, GenericState<News[]>>(state => state.news);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(request());
  }, [])

  const handleNewsClicked = (news: News) => {
    console.log('>>> clicked', news)
  }

  if (status === 'loading') {
    return <Spin />
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

  return (
    <div>
      <h1>News</h1>
      {
        data?.map((news: News, index) => (
          <div key={`${news.title}-${index}`} onClick={() => handleNewsClicked(news)} style={{
            display: 'flex',
            flexDirection: 'row',
            margin: '20px',
            background: '#0d0d0d',
            cursor: 'pointer'
          }}>
            <img src={news.cover} height='200px' />
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
                <Paragraph strong style={{ fontSize: 22, flex: 1 }}>{news.title}</Paragraph>
                <Paragraph style={{ alignSelf: 'end', opacity: .65 }}>{new Date(news.createdAt.toString()).toLocaleDateString()}</Paragraph>
              </div>
              <Paragraph style={{ alignSelf: 'stretch' }}>{news.summary}</Paragraph>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default Home;
