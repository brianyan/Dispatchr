/* This helper function abstracts creating a reducer function.
It basically means you don't have to write a switch statement each
time you want to create a reducer

Source: https://github.com/yelouafi/redux-saga */
export default function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}
