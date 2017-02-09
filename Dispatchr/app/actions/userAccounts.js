import * as types from './types'

export function login(credentials) {
  return {
    type: types.USER_LOGIN,
    credentials
  }
}
