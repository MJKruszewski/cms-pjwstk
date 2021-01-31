import { combineReducers } from '@reduxjs/toolkit';
import productsReducer from '@frontendSrc/products/slice';
import cartReducer from '@frontendSrc/cart/slice';
import counterReducer from '@frontendStore/counterReducer';
import newsReducer from '@frontendSrc/news/slice';
import promotedReducer from '@frontendSrc/promoted/slice';
import shippingMethodsReducer from '@frontendSrc/shipping-methods/slice';

const rootReducer = combineReducers({
  counter: counterReducer,
  products: productsReducer,
  cart: cartReducer,
  news: newsReducer,
  shippingMethods: shippingMethodsReducer,
  promoted: promotedReducer
});

export default rootReducer;
