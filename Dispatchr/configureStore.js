import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createLogger from 'redux-logger';
import reducer from './app/reducers'

function configureStore() {
  // Logger should only be used when developing
  const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

  // Set up logger
  const loggerMiddleware = createLogger({
    predicate: (getState, action) => isDebuggingInChrome,
    collapsed: true,
    duration: true,
    diff: true,
  });

  const enhancer = compose(
    applyMiddleware(
      loggerMiddleware,
    )
  );

  return createStore(reducer, enhancer);
};

export const store = configureStore({});
