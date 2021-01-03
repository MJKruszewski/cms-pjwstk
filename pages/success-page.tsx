import React, {FC} from 'react'
import {Result, Typography} from "antd";

const { Paragraph, Text } = Typography;

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
    )
};

export default SuccessPage
