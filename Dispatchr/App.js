import React, { Component } from 'react';
import { Scene, Router, Reducer } from 'react-native-router-flux';
import Requests from './app/requests';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import reducers from './app/reducers';
import rootSaga from './sagas';

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

// define this based on the styles/dimensions you use
const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 64;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router getSceneStyle={getSceneStyle}>
          <Scene key="root">
            <Scene key={Requests.name} component={Requests.component} title='Requests'/>
          </Scene>
        </Router>
      </Provider>
    );
  }
}

export default App;
