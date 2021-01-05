import {OrderDto} from '../../../api/domain/order.domain';
import {PayloadAction} from '@reduxjs/toolkit';
import {put, takeEvery} from 'redux-saga/effects';
import {failure, postPayment, postPaymentFinished, request, success} from './slice';

function* fetchConfigurationSaga({ payload }: PayloadAction<string>) {
  try {
    //TODO IN CART CAN BE MANY CONFIGURATIONS
    const response = yield fetch(`${process.env.API_HOST}/api/v1/configurations/${payload}`);
    const data = yield response.json();
    yield (put(success(data)))
  } catch (error) {
    yield put(failure(error))
  }
}

function* postPaymentSaga({ payload }: PayloadAction<OrderDto>) {
  try {
    const response = yield fetch(`${process.env.API_HOST}/api/v1/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const data = yield response.json();
    yield (put(postPaymentFinished(true)))
  } catch (error) {
    yield put(postPaymentFinished(false))
  }
}

function* saga() {
  yield takeEvery(request.type, fetchConfigurationSaga);
  yield takeEvery(postPayment.type, postPaymentSaga);
}

export default saga;