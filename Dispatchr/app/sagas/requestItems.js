import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as types from '../actions/types';

function* requestItemRequested() {
  const response = yield call(fetch, 'https://dispatchr-api.herokuapp.com/items/', { method: 'GET'} );
  yield put({ type: types.REQUEST_ITEMS_RECEIVED, payload: response.json() })
}

export default function* root() {
  yield takeLatest(types.REQUEST_ITEMS_REQUESTED, requestItemRequested);
}
