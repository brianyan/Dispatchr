import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as types from '../actions/types';
import { Actions } from 'react-native-router-flux';

function* createRequest(requestData) {
  var convertedDate = requestData.request.expirationDate.split('-');
  convertedDate = convertedDate[2] + "-" + convertedDate[1] + "-" + convertedDate[0];
  const requestItemJSON = JSON.stringify({request : {
    expiration_date: convertedDate,
    user_id: 2,
    request_items: requestData.request.items
  }});
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  const response = yield call(
    fetch, 
    'https://dispatchr-api.herokuapp.com/requests',
    { method: 'POST', headers: headers, body: requestItemJSON }
  );
  const json =  yield call(response.json.bind(response)) // better option
  yield call(Actions.pop);
}

export default function* root() {
  yield takeLatest(types.ADD_NEW_REQUEST, createRequest);
}
