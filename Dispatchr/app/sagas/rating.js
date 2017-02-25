import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as types from '../actions/types';
import BASE_URL from '../config/url';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
function* submitRating(data) {
  url = BASE_URL + "/users/reputation/" + data['id'];
  const authToken = yield call(AsyncStorage.getItem, 'authToken');
  const jsonBody = JSON.stringify({
    score: data['score']
  });
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': authToken
  };
  const response = yield call(fetch, url, { method: 'POST', headers: headers, body: jsonBody });
  const json =  yield call(response.json.bind(response))
  Actions.pop();
  Actions.pop();
  Actions.pop();
  yield put({ type: types.USER_REVIEW_SUBMITED, payload: json})
}

export default function* root() {
  yield takeLatest(types.SUBMIT_USER_REVIEW, submitRating);
}
