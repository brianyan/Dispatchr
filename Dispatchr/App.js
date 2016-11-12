import React, { Component } from 'react';
import { Scene, Router, Reducer } from 'react-native-router-flux';
import * as RequestItems from './app/request_items';
import { Provider } from 'react-redux';
import { configureStore } from './configureStore';

const getSceneStyle = (props, computedProps) => {
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

export default class App extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <Router getSceneStyle={getSceneStyle}>
          <Scene key="root">
            <Scene key={RequestItems.name} component={RequestItems.component} title='Items' initial={true}/>
          </Scene>
        </Router>
      </Provider>
    );
  }
}
