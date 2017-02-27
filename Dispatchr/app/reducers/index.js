import { combineReducers } from 'redux';
import * as newRequestReducer from './newRequests';
import * as requestsReducer from './requests';
import * as itemsReducer from './items';
import * as userReducer from './userAccounts.js';
import * as notificationsReducer from './notifications';
import * as userInfoReducer from './userInfo';
import * as usersReducer from './users';


/* Combines all reducers into one object. Creates a mechanism for adding different
reducers in our application. We can have different portions of state managed by a
different reducer. */
export default combineReducers(Object.assign(
  newRequestReducer,
  requestsReducer,
  itemsReducer,
  userReducer,
  notificationsReducer,
  userInfoReducer,
  usersReducer
))
