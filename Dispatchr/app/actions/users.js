import * as types from './types'

export function getUser(id) {
  return {
    type: types.GET_USER,
    id
  }
}
