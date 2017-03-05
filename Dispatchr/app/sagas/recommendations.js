import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as types from '../actions/types';
import BASE_URL from '../config/url';
import { AsyncStorage } from 'react-native';

function* getRecommendations() {
  url = BASE_URL + "/recommendations/get/" + id
  const response = yield call(fetch, url, { method: 'GET'} );
  const json =  yield call(response.json.bind(response))
  yield put({ type: types.GET_RECOMMENDATIONS, payload: json})
}

export default function* root() {
  yield takeLatest(types.GET_RECOMMENDATIONS, getRecommendations);
}
