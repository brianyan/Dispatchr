import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as types from '../actions/types';
import {Actions} from 'react-native-router-flux'


function* addItem() {
  yield call(Actions.pop);
}

export default function* root() {
  yield takeLatest(types.ADD_ITEM, addItem);
}
