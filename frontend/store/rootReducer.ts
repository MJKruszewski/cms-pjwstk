import {combineReducers} from '@reduxjs/toolkit';
import productsReducer from '@frontendSrc/products/slice';
import cartReducer from '@frontendSrc/cart/slice';
import counterReducer from "@frontendStore/counterReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  products: productsReducer,
  cart: cartReducer
});

export default rootReducer;