import { fork } from 'redux-saga/effects';

import requestItems from './requestItems';
import newRequests from './newRequests.js';


export default function* root() {
  yield [
    fork(requestItems),
    fork(newRequests),
  ]
}
