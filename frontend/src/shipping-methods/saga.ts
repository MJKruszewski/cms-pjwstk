import {put, takeEvery} from 'redux-saga/effects';
import {failure, request, success} from './slice';

function* fetchShippingMethodsSaga() {
    try {
        const response = yield fetch(`${process.env.API_HOST}/api/v1/shipping-methods`);
        const data = yield response.json();
        yield(put(success(data)))
    } catch (error) {
        yield put(failure(error))
    }
}

function* saga() {
    yield takeEvery(request.type, fetchShippingMethodsSaga);
}

export default saga;
