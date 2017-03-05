import * as NewRequestActions from './newRequests'
import * as requestActions from './requests'
import * as itemActions from './items'
import * as userActions from './userAccounts'
import * as notificationActions from './notifications'
import * as userInfoActions from './userInfo'
import * as usersActions from './users'
import * as recommendationActions from './recommendations'
import * as ratingActions from './rating';

/* This mergers all the actions we might have in our application and returning
   them as one object. Useful when our application is getting big. Essentially
   a manifest file */
export const ActionCreators = Object.assign({},
  NewRequestActions,
  requestActions,
  itemActions,
  userActions,
  notificationActions,
  userInfoActions,
  usersActions,
  recommendationActions,
  ratingActions
)
