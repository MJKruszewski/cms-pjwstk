import {combineReducers} from '@reduxjs/toolkit';
import productsReducer from '@src/products/slice';
import cartReducer from '@src/cart/slice';
import counterReducer from "@store/counterReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  products: productsReducer,
  cart: cartReducer
});

export default rootReducer;