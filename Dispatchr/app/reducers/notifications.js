import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const notifications = createReducer([], {
  [types.NOTIFICATIONS_REQUESTED](state, action) {
    return state;
  },
  [types.NOTIFICATIONS_RECEIVED](state, action) {
    return action.payload;
  }
});
