import { fork } from 'redux-saga/effects';
import requests from './requests';
import newRequests from './newRequests.js';
import items from './items'


export default function* root() {
  yield [
    fork(requests),
    fork(newRequests),
    fork(items),
  ]
}
