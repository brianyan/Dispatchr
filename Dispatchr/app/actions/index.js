import * as RequestItemsActions from './requestItems'
import * as NewRequestActions from './newRequests'


/* This mergers all the actions we might have in our application and returning
   them as one object. Useful when our application is getting big. Essentially
   a manifest file */
export const ActionCreators = Object.assign({},
  RequestItemsActions,
  NewRequestActions,
)
