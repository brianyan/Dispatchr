import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as types from '../actions/types';

function* userLogin(data) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  const userCredentialsJSON = JSON.stringify(
    {email: data.credentials.username, password: data.credentials.password }
  );

  const response = yield call(
    fetch,
    'https://dispatchr-api.herokuapp.com/login',
    { method: 'POST', headers: headers, body: userCredentialsJSON }
  );
}

export default function* root() {
  yield takeLatest(types.USER_LOGIN, userLogin);
}
