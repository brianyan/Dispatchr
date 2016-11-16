import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const requestedItems = createReducer([], {
  [types.REQUEST_ITEMS_REQUESTED](state, action) {
    return state;
  },
  [types.REQUEST_ITEMS_RECEIVED](state, action) {
    var items;
    const result = action.payload.then(function(i){
      items = i;
      console.log(items);
    });
    console.log(items);
    let newState = result;
    return newState;
  },
});
