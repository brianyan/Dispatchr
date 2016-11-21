import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as types from '../actions/types';

function* newRequestPopup() {
  // yield put({ type: types.NEW_REQUEST_SHOW })
}

export default function* root() {
  yield takeLatest(types.ADD_NEW_REQUEST, newRequestPopup);
}
