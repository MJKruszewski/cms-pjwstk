import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeEvery } from 'redux-saga/effects';
import { increment, decrement } from './counterReducer';

function* decrementAgain({ payload }: PayloadAction<number>) {
  // yield put(decrement(payload));
  //  or do something usefull :D
}

function* counterSaga() {
  yield takeEvery(increment.type, decrementAgain);
}

export default counterSaga;