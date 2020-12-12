import rootReducer from './rootReducer';
import { createStore, applyMiddleware } from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { useDispatch } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import counterSaga from './counterSaga';
import productsSaga from 'src/products/saga';

const bindMiddleware = (...middleware: any) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, bindMiddleware(sagaMiddleware));

// example how to add saga
sagaMiddleware.run(counterSaga);
sagaMiddleware.run(productsSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const wrapper = createWrapper(() => store);
