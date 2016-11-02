import React, { Component } from 'react';
import { Scene, Router, Reducer } from 'react-native-router-flux';
import Home from './components/home';


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

// TODO: Refactor reducer into a new class https://github.com/aksonov/react-native-router-flux/blob/master/docs/REDUX_FLUX.md
const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};

class App extends Component {
  render() {
    return <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
      <Scene key="root">
        <Scene key="home" component={Home} title="Home"/>
      </Scene>
    </Router>
  }
}

export default App;
