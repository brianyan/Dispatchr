import * as types from './actionTypes';

const initialState = {
  request_items: []
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.REQUEST_ITEMS_REQUESTED:
      return state;
    case types.REQUEST_ITEMS_RECEIVED:
      return {
        ...state,
        request_items: [...state.request_items, action.payload]
      };
    default:
      return state;
  }
}
