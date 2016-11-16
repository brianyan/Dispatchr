import React, { Component } from 'react';
import { Scene, Router, Reducer } from 'react-native-router-flux';
import RequestItemsGlobalList from './RequestItemsGlobalList';
import DetailedView from '../components/DetailedView';

/* Stylesheet */
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

class App extends Component {
  render() {
    return (
      <Router getSceneStyle={getSceneStyle}>
        <Scene key="root">
          <Scene key = {"DetailedView"} component = {DetailedView} title = 'Detailed View For Request' />
          <Scene key = {"RequestItemsGlobalList"} component={RequestItemsGlobalList} title='Global Request List' initial={true}/>
        </Scene>
      </Router>
    );
  }
}

export default App;
