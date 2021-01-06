import {PcConfigurationDto} from '@frontendDto/configuration.dto';
import {PayloadAction} from '@reduxjs/toolkit';
import {put, takeEvery} from 'redux-saga/effects';
import {failure, postConfiguration, postConfigurationFinished, request, success} from './slice';

function* fetchProductsSaga() {
  try {
    const response = yield fetch(`${process.env.API_HOST}/api/v1/products`);
    const data = yield response.json();
    yield(put(success(data)))
  } catch (error) {
    yield put(failure(error))
  }
}

function* postConfigurationSaga({ payload }: PayloadAction<PcConfigurationDto>) {
  try {
    const response = yield fetch(`${process.env.API_HOST}/api/v1/configurations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const data = yield response.json();
    yield(put(postConfigurationFinished(true)))
  } catch (error) {
    yield put(postConfigurationFinished(false))
  }
}

function* saga() {
  yield takeEvery(request.type, fetchProductsSaga);
  yield takeEvery(postConfiguration.type, postConfigurationSaga);
}

export default saga;