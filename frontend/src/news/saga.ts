import {put, takeEvery} from 'redux-saga/effects';
import {failure, request, success} from './slice';

function* fetchProductsSaga() {
    try {
        const response = yield fetch(`${process.env.API_HOST}/api/v1/products`);
        const data = yield response.json();
        yield(put(success(data)))
    } catch (error) {
        yield put(failure(error))
    }
}

function* fetchNewsSaga() {
    try {
        const response = yield fetch(`${process.env.API_HOST}/api/v1/news`);
        const data = yield response.json();
        yield(put(success(data)))
    } catch (error) {
        yield put(failure(error))
    }
}

function* saga() {
    yield takeEvery(request.type, fetchNewsSaga);
}

export default saga;