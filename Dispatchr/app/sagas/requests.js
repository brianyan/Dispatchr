import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as types from '../actions/types';

function* requestsRequested(data) {
  url = 'https://dispatchr-api.herokuapp.com/requests';
  if (data.selection == 'User'){
    url += '/user/?user_id=2';
  }
  const response = yield call(fetch, url, { method: 'GET'} );
  const json =  yield call(response.json.bind(response)) // better option
  yield put({ type: types.REQUEST_RECEIVED, payload: json})
}

export default function* root() {
  yield takeLatest(types.REQUEST_REQUESTED, requestsRequested);
}
