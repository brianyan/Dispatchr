import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const userInfo = createReducer([], {
  [types.GET_USER_INFO](state, action) {
    return state;
  },
  [types.USER_INFO_RECEIVED](state, action) {
    return action.payload;
  }
});
