import { fork } from 'redux-saga/effects';
import requests from './requests';
import newRequests from './newRequests';
import items from './items'
import userAccounts from './userAccounts'


export default function* root() {
  yield [
    fork(requests),
    fork(newRequests),
    fork(items),
    fork(userAccounts),
  ]
}
