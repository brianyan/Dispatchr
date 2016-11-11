import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as types from './actionTypes';

function* requestItemRequested() {
  const response = yield call(fetch, 'http://localhost:3000/request_items');
  yield put({ type: types.REQUEST_ITEMS_RECEIVED, payload: response })
}

export default function* root() {
  yield takeLatest(types.REQUEST_ITEMS_REQUESTED, requestItemRequested);
}
