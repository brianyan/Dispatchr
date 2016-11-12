import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import reducers from './app/reducers';
import rootSaga from './sagas';

export const configureStore = () => {
  const reducer = combineReducers(reducers);

  const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

  const loggerMiddleware = createLogger({
    predicate: (getState, action) => isDebuggingInChrome,
    collapsed: true,
    duration: true,
    diff: true,
  });

  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    reducer,
    applyMiddleware(loggerMiddleware, sagaMiddleware)
  )
  sagaMiddleware.run(rootSaga)

  return store;
};
