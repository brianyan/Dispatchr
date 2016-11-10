import * as types from './actionTypes';

const initialState = {
  requests: []
};

export default function requestsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.LIST_RECEIVED:
      return {
        ...state,
        requests: []
      };
    case 'PRODUCT_ITEMS_RECEIVED':
      return {
        ...state,
        requests: [...state.requests, action.payload]
      };
    default:
      return state;
  }
}
