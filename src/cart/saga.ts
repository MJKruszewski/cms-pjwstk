import { PcConfigurationDto } from '@domain/configuration.domain';
import { OrderDto } from '@domain/order.domain';
import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeEvery } from 'redux-saga/effects';
import { request, success, failure, postPayment, postPaymentFinished } from './slice';

function* fetchConfigurationSaga({ payload }: PayloadAction<string>) {
  try {
    const response = yield fetch(`/api/v1/configurations/${payload}`);
    const data = yield response.json();
    yield (put(success(data)))
  } catch (error) {
    yield put(failure(error))
  }
}

function* postPaymentSaga({ payload }: PayloadAction<OrderDto>) {
  try {
    const response = yield fetch('/api/v1/orders', {
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