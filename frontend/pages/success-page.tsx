import React, { FC } from 'react';
import { Result } from 'antd';

const SuccessPage: FC = () => {
  return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto'
        }}>
            <Result
              status='success'
              title="Congratulations"
              subTitle="You have successfully placed an order in our PC-Geek Shop! Be patient, we are starting completing your order to send it to you as quick as possible :) !"
            />
        </div>
  );
};

export default SuccessPage;
