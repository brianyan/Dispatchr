import * as types from './types'

export function authenticate(credentials) {
  return {
    type: types.USER_LOGIN,
    credentials
  }
}
