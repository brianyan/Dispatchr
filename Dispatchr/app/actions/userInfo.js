import * as types from './types'

export function getUserInfo() {
  return {
    type: types.GET_USER_INFO
  }
}

export function getUserId() {
  return {
    type: types.GET_USER_ID
  }
}

export function showCurrentUserProfile() {
  return {
    type: types.GOTO_CURRENT_USER_PROFILE
  }
}
