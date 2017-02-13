import { combineReducers } from 'redux';
import * as newRequestReducer from './newRequests';
import * as requestsReducer from './requests';
import * as itemsReducer from './items';
import * as notificationsReducer from './notifications';


/* Combines all reducers into one object. Creates a mechanism for adding different
reducers in our application. We can have different portions of state managed by a
different reducer. */
export default combineReducers(Object.assign(
  newRequestReducer,
  requestsReducer,
  itemsReducer,
  notificationsReducer
))
