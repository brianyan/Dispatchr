import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const users = createReducer([], {
  [types.GET_USER](state, action) {
    return state;
  },
  [types.USER_RETREIVED](state, action) {
    console.log(action.payload);
    return action.payload;
  }
});
