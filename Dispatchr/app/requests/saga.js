import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

function* requestsRequested() {
  const response = yield call(fetch, 'https://www.google.com');
  console.log(response);
  yield put({ type: 'PRODUCT_ITEMS_RECEIVED', payload: 'hello world' })
}

export default function* root() {
  yield takeLatest('GET_REQUESTS', requestsRequested);
}
