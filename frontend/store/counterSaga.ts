import { PayloadAction } from '@reduxjs/toolkit';
import { takeEvery } from 'redux-saga/effects';
import { increment } from './counterReducer';

function * decrementAgain ({ payload }: PayloadAction<number>) {
  // yield put(decrement(payload));
  //  or do something usefull :D
}

function * counterSaga () {
  yield takeEvery(increment.type, decrementAgain);
}

export default counterSaga;
