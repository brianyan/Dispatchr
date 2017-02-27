import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as types from '../actions/types';
import BASE_URL from '../config/url';
import { AsyncStorage } from 'react-native';

function* getNotifications() {
  const id = yield call(AsyncStorage.getItem, 'currentUserId');
  url = BASE_URL + "/notifications/get/" + id
  yield call(console.log, url);
  const response = yield call(fetch, url, { method: 'GET'} );
  const json =  yield call(response.json.bind(response))
  yield put({ type: types.NOTIFICATIONS_RECEIVED, payload: json})
}

export default function* root() {
  yield takeLatest(types.NOTIFICATIONS_REQUESTED, getNotifications);
}
