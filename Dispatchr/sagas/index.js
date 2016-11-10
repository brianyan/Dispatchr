import { fork } from 'redux-saga/effects';

import saga from '../app/requests/saga';

export default function* root() {
  console.log('requestsSaga', saga);
  yield fork(saga);
}
