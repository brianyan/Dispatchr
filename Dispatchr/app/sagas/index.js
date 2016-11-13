import { fork } from 'redux-saga/effects';

import requestItems from './requestItems';

export default function* root() {
  yield fork(requestItems);
}
