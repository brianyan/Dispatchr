import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as types from '../actions/types';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import BASE_URL from '../config/url';

function* createRequest(requestData) {
  const currentUserId = yield call(AsyncStorage.getItem, 'currentUserId');
  const authToken = yield call(AsyncStorage.getItem, 'authToken');
  var convertedDate = requestData.request.expirationDate;
  const requestItemJSON = JSON.stringify({request : {
    expiration_date: convertedDate,
    user_id: currentUserId,
    request_items: requestData.request.items
  }});
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': authToken
  };
  const response = yield call(
    fetch,
    BASE_URL + '/requests',
    { method: 'POST', headers: headers, body: requestItemJSON }
  );
  const json =  yield call(response.json.bind(response)) // better option
  yield call(Actions.pop);
}

export default function* root() {
  yield takeLatest(types.ADD_NEW_REQUEST, createRequest);
}
