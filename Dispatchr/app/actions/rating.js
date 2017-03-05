import * as types from './types'

export function submitRating(data) {
  return {
    type: types.SUBMIT_USER_REVIEW,
    data
  }
}
