import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as types from '../actions/types';
import BASE_URL from '../config/url';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import { Alert } from 'react-native';

function* userLogin(data) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  const userCredentialsJSON = JSON.stringify(
    { email: data.credentials.username, password: data.credentials.password }
  );

  const response = yield call(
    fetch,
    BASE_URL + '/login',
    { method: 'POST', headers: headers, body: userCredentialsJSON }
  );
  const json =  yield call(response.json.bind(response)) // better option
  if (json['auth_token'] && json['user']) {
    try {
      yield call(AsyncStorage.setItem, 'currentUser', json['user'].username);
      yield call(AsyncStorage.setItem, 'currentUserId', json['user'].id.toString());
      yield call(AsyncStorage.setItem, 'authToken', json['auth_token']);
      Actions.RequestsList();
    } catch (error) {
      yield call(console.log, error);
    }
    yield put({ type: types.SUCCESSFUL_LOGIN })
  } else {
    Alert.alert(
      'Sign In Failed',
      "Invalid username or password",
      [
        {text: 'OK', onPress: () => {}},
      ]
    )
    yield put({ type: types.INVALID_LOGIN })
  }
}

export default function* root() {
  yield takeLatest(types.USER_LOGIN, userLogin);
}
