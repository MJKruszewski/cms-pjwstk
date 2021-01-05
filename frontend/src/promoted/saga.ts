import {put, takeEvery} from 'redux-saga/effects';
import {failure, request, success} from './slice';
import {PayloadAction} from "@reduxjs/toolkit";

function* fetchPromoProductsSaga({ payload }: PayloadAction<string>) {
  try {
    const response = yield fetch(`${process.env.API_HOST}/api/v1/products/promoted/${payload}`);
    const data = yield response.json();
    yield (put(success(data)))
  } catch (error) {
    yield put(failure(error))
  }
}

function* saga() {
  yield takeEvery(request.type, fetchPromoProductsSaga);
}

export default saga;