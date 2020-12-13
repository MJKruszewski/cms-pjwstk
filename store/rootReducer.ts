import { combineReducers } from '@reduxjs/toolkit';
import productsReducer from '@src/products/slice';
import counterReducer from "@store/counterReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  products: productsReducer,
});

export default rootReducer;