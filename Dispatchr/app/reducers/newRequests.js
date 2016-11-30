import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const newRequest = createReducer(false, {
  [types.ADD_NEW_REQUEST](state, action) {
    return state;
  }
});
