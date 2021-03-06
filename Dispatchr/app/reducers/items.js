import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const items = createReducer([], {
  [types.ADD_ITEM](state, action) {
    let newState = state.concat(action.item);
    return newState;
  },
});
