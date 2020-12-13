import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeEvery } from 'redux-saga/effects';
import { request, success, failure } from './slice';

function* fetchProducts({ payload }: PayloadAction<any>) {
  try {
    const response = yield fetch('/api/v1/products');
    const data = yield response.json();
    yield(put(success(data)))
  } catch (error) {
    yield put(failure(error))
  }
}

function* saga() {
  yield takeEvery(request.type, fetchProducts);
}

export default saga;