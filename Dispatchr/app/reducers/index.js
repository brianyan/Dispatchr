import { combineReducers } from 'redux';
import * as requestItemsReducer from './requestItems';
import * as newRequestReducer from './newRequests';

/* Combines all reducers into one object. Creates a mechanism for adding different
reducers in our application. We can have different portions of state managed by a
different reducer. */
export default combineReducers(Object.assign(
  requestItemsReducer,
  newRequestReducer
))
