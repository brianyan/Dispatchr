import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as types from '../actions/types';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import BASE_URL from '../config/url';

function* requestsRequested(data) {
  const currentUserId = yield call(AsyncStorage.getItem, 'currentUserId');
  const authToken = yield call(AsyncStorage.getItem, 'authToken');

  url = BASE_URL + '/requests';
  if (data.selection == 'User'){
    url += '/user/' + currentUserId;
    console.log(url);
  }
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': authToken
  };
  const response = yield call(
    fetch,
    url,
    { method: 'GET', headers: headers }
  );
  const json =  yield call(response.json.bind(response)) // better option
  yield put({ type: types.REQUEST_RECEIVED, payload: json})
}

function* requestAccepted(data) {
  const currentUserId = yield call(AsyncStorage.getItem, 'currentUserId');
  const authToken = yield call(AsyncStorage.getItem, 'authToken');

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': authToken
  };

  var url = BASE_URL + '/requests/accept/' + data.request.id;
  const response = yield call(fetch, url, { method: 'POST', headers: headers });
  const json = yield call(response.json.bind(response));
  Alert.alert(
    response.status == 200 ? 'Request Accepted' : 'Unable to Accept Request',
    response.status == 200 ? 'You\'re a hero!' : 'Please try again later',
    [
      {text: 'OK', onPress: () => {Actions.pop()}},
    ]
  )
}

function* requestDeleted(data) {
  const currentUserId = yield call(AsyncStorage.getItem, 'currentUserId');
  const authToken = yield call(AsyncStorage.getItem, 'authToken');

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': authToken
  };

  var url = BASE_URL + '/requests/' + data.request.id;
  const response = yield call(fetch, url, { method: 'DELETE', headers: headers });
  const json = yield call(response.json.bind(response));
  Alert.alert(
    response.status == 200 ? 'Request Deleted' : 'Unable to delete Request',
    response.status == 200 ? 'Request Deleted' : 'Please try again later',
    [
      {text: 'OK', onPress: () => {Actions.pop()}},
    ]
  )
  console.log(response.status)
}

export default function* root() {
  yield [
    takeLatest(types.REQUEST_REQUESTED, requestsRequested),
    takeLatest(types.REQUEST_ACCEPTED, requestAccepted),
    takeLatest(types.REQUEST_DELETED, requestDeleted)
  ];
}
