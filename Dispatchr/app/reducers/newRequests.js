import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const newRequests = createReducer([], {
  [types.ADD_NEW_REQUEST](state, action) {
    return state;
  },
});
