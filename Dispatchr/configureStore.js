import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import createLogger from 'redux-logger';
import reducer from './app/reducers'
import rootSaga from './app/sagas'

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

  const sagaMiddleware = createSagaMiddleware();

  const enhancer = compose(
    applyMiddleware(
      loggerMiddleware,
      sagaMiddleware
    )
  );

  const store = createStore(reducer, enhancer);
  sagaMiddleware.run(rootSaga);

  return store;
};

export const store = configureStore({});
