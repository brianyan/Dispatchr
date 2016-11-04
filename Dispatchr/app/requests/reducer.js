import * as types from './actionTypes';

const initialState = {
  requests: []
};

export default function requestsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_REQUESTS:
      // TODO: fetch requests from API
      return {
        ...state,
        requests: []
      };
    default:
      return state;
  }
}
