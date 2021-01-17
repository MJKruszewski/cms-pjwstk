import {combineReducers} from '@reduxjs/toolkit';
import productsReducer from '@frontendSrc/products/slice';
import cartReducer from '@frontendSrc/cart/slice';
import counterReducer from "@frontendStore/counterReducer";
import newsReducer from '@frontendSrc/news/slice';
import promotedReducer from '@frontendSrc/promoted/slice';

const rootReducer = combineReducers({
  counter: counterReducer,
  products: productsReducer,
  cart: cartReducer,
  promoted: promotedReducer,
  news: newsReducer
});

export default rootReducer;