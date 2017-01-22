import * as types from './types'

export function getRequests(selection) {
  return {
    type: types.REQUEST_REQUESTED,
    selection
  }
}

export function acceptRequest(request) {
  return {
    type: types.REQUEST_ACCEPTED,
    request
  };
}
