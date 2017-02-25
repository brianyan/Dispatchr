import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const userInfo = createReducer([], {
  [types.GET_USER_INFO](state, action) {
    return state;
  },
  [types.GET_USER_ID](state, action) {
    return state;
  },
  [types.USER_INFO_RECEIVED](state, action) {
    return action.payload;
  },
  [types.USER_ID_RECEIVED](state, action) {
    return action.payload;
  },
  [types.GOTO_CURRENT_USER_PROFILE](state, action) {
    return state;
  }
});
