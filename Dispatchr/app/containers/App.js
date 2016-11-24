import React, { Component } from 'react';
import { Scene, Router, Reducer } from 'react-native-router-flux';
import DetailedView from '../components/DetailedView';
import RequestsList from './RequestsList'

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
    // style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};

class App extends Component {
  render() {
    return (
      <Router getSceneStyle={getSceneStyle}>
        <Scene key="root">
          <Scene key={"RequestsList"} component={RequestsList} title='Requests' initial={true}/>
          <Scene key = {"DetailedView"} component = {DetailedView} title = 'Detailed View For Request' />
        </Scene>
      </Router>
    );
  }
}

export default App;
