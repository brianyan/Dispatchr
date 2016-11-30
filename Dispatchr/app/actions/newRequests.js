import * as types from './types'

export function newRequest(request) {
  return {
    type: types.ADD_NEW_REQUEST,
    request
  }
}
