import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const userAuth = createReducer(false, {
  [types.SUCCESSFUL_LOGIN](state, action) {
    return state;
  }
});
