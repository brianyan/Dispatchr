import { fork } from 'redux-saga/effects';

import saga from '../app/request_items/saga';

export default function* root() {
  yield fork(saga);
}
