import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const requestedItems = createReducer([], {
  [types.REQUEST_ITEMS_REQUESTED](state, action) {
    return state;
  },
  [types.REQUEST_ITEMS_RECIEVED](state, action) {
    console.log("Payload:" + action.payload);
    let newState = [action.payload];
    return newState;
  },
});
