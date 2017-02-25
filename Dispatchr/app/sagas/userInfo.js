import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as types from '../actions/types';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';

function* getUserInfo(requestData) {
  const currentUser = yield call(AsyncStorage.getItem, 'currentUser');
  yield put({ type: types.USER_INFO_RECEIVED, payload: currentUser});
}

function* getUserId() {
  const id = yield call(AsyncStorage.getItem, 'currentUserId');
  yield put({ type: types.USER_ID_RECEIVED, payload: {currentUserId: id}});
}

function* showCurrentUserProfile() {
  const id = yield call(AsyncStorage.getItem, 'currentUserId');
  Actions.ProfileView({userId: id});
}

export default function* root() {
  yield [
    takeLatest(types.GET_USER_INFO, getUserInfo),
    takeLatest(types.GET_USER_ID, getUserId),
    takeLatest(types.GOTO_CURRENT_USER_PROFILE, showCurrentUserProfile)
  ];
}
