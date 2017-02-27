import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const requests = createReducer([], {
  [types.REQUEST_REQUESTED](state, action) {
    return state;
  },
  [types.REQUEST_RECEIVED](state, action) {
    return action.payload;
  },
  [types.REQUEST_ACCEPTED](state, action) {
    return state;
  },
  [types.REQUEST_DELETED](state, action) {
    return state;
  }
});
