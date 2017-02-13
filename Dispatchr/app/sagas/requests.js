import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as types from '../actions/types';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import BASE_URL from '../config/url';

function* requestsRequested(data) {
  url = BASE_URL + '/requests';
  if (data.selection == 'User'){
    url += '/user/?user_id=2';
  }
  const response = yield call(fetch, url, { method: 'GET'} );
  const json =  yield call(response.json.bind(response)) // better option
  yield put({ type: types.REQUEST_RECEIVED, payload: json})
}

function* requestAccepted(data) {
  // url = BASE_URL + '/requests/' + data.id;
  // const response = yield call(fetch, url, { method: 'POST' });
  // const json = yield call(response.json.bind(response));
  Alert.alert(
    'Request Accepted',
    "You're a hero!",
    [
      {text: 'OK', onPress: () => {Actions.pop()}},
    ]
  )
}

export default function* root() {
  yield [
    takeLatest(types.REQUEST_REQUESTED, requestsRequested),
    takeLatest(types.REQUEST_ACCEPTED, requestAccepted)
  ];
}
