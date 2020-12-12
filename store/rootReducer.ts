import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterReducer';
import productsReducer from 'src/products/slice';

const rootReducer = combineReducers({
  counter: counterReducer,
  products: productsReducer,
});

export default rootReducer;