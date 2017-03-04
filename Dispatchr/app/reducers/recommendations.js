import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const notifications = createReducer([], {
  [types.GET_RECOMMENDATIONS](state, action) {
    return state;
  }
});
