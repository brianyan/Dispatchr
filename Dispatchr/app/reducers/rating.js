import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const rating = createReducer([], {
  [types.SUBMIT_USER_REVIEW](state, action) {
    return state;
  },
  [types.USER_REVIEW_SUBMITED](state, action) {
    return action.payload;
  }
});
