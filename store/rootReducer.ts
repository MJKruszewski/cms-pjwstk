import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterReducer';

const rootReducer = combineReducers({
  // example how to add reducer
  counter: counterReducer,
});

export default rootReducer;