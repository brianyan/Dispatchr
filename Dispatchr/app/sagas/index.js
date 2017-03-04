import { fork } from 'redux-saga/effects';
import requests from './requests';
import newRequests from './newRequests';
import items from './items'
import userAccounts from './userAccounts'
import notifications from './notifications';
import userInfo from './userInfo';
import users from './users';
import recommendations from './recommendations';

export default function* root() {
  yield [
    fork(requests),
    fork(newRequests),
    fork(items),
    fork(userAccounts),
    fork(notifications),
    fork(userInfo),
    fork(users),
    fork(recommendations),
  ]
}
