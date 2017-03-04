import * as types from './types'

export function getRecommendations(item) {
  return {
    type: types.GET_RECOMMENDATIONS,
    item
  }
}
