import { Button, Typography } from 'antd';
import { FC } from 'react';

import { useSelector } from 'react-redux';
import { decrement, increment } from 'store/counterReducer';
import { GenericState } from 'store/genericDataSlice';
import { RootState, useAppDispatch } from 'store/rootStore';

const Home: FC = () => {
  const { data, status } = useSelector<RootState, GenericState<number>>(state => state.counter);
  const dispatch = useAppDispatch();

  const handlePlusClicked = () => dispatch(increment(1))
  const handleMinusClicked = () => dispatch(decrement(1))

  return (
    <div>
      <h1>Home</h1>
      <div className='counter-example'>
        <Button onClick={handlePlusClicked}>
          +
        </Button>
        <Typography style={{ margin: '20px' }}>
          {data}
        </Typography>
        <Button onClick={handleMinusClicked}>
          -
        </Button>
      </div>
      <style jsx>
        {`
          .counter-example {
            display: flex;
            flex-direction: row;
            align-items: center;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
