import rootReducer from './rootReducer';
import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { useDispatch } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import productsSaga from '@frontendSrc/products/saga';
import cartSaga from '@frontendSrc/cart/saga';
import newsSaga from '@frontendSrc/news/saga';
import shipmentMethodsSaga from "@frontendSrc/shipping-methods/saga";
import counterSaga from "@frontendStore/counterSaga";

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
sagaMiddleware.run(cartSaga);
sagaMiddleware.run(newsSaga);
sagaMiddleware.run(shipmentMethodsSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const wrapper = createWrapper(() => store);
