import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as types from '../actions/types';
import BASE_URL from '../config/url';
import { AsyncStorage } from 'react-native';

function* getUser(data) {
  const authToken = yield call(AsyncStorage.getItem, 'authToken');

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': authToken
  };
  var url = BASE_URL + '/users/' + data['id'];
  const response = yield call(fetch, url, { method: 'GET', headers: headers });
  const json = yield call(response.json.bind(response));
  yield put({ type: types.USER_RETREIVED, payload: {user: json}})
}

export default function* root() {
  yield takeLatest(types.GET_USER, getUser);
}
