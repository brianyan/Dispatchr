import React, { Component } from 'react';
import { Scene, Router, Reducer, ActionConst } from 'react-native-router-flux';
import DetailedView from '../components/DetailedView';
import LoginView from './LoginView';
import RequestsList from './RequestsList'
import NewRequestView from '../components/NewRequestView';
import NewItemForm from '../components/NewItemForm';
import EditItemForm from '../components/EditItemForm';
import {StyleSheet, StatusBar} from 'react-native';

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
  }
  return style;
};

class App extends Component {
  render() {
    StatusBar.setBarStyle('light-content', true);

    return (
      <Router navigationBarStyle = {styles.navBar} titleStyle = {styles.title} getSceneStyle={getSceneStyle} barButtonIconStyle = {styles.backButtonStyle}>
        <Scene key="root">
          <Scene key = {"RequestsList"} component={RequestsList} title='Requests' type={ActionConst.REPLACE}/>
          <Scene key = {"DetailedView"} component = {DetailedView} title = 'Detailed View For Request' />
          <Scene key = {"LoginView"} component = {LoginView} hideNavBar title = 'User Login' initial={true} />
          <Scene key = {"NewRequestView"} component = {NewRequestView} title = 'New Request' />
          <Scene key = {"NewItemForm"} component = {NewItemForm} title = 'Add Item' />
          <Scene key = {"EditItemForm"} component = {EditItemForm} title = 'Edit Item' />
        </Scene>
      </Router>
    );
  }
}

var styles = StyleSheet.create({
    navBar: {
      backgroundColor: '#48BBEC',
    },
    title: {
      color: 'white',
      fontFamily: 'Helvetica Neue'
    },
    backButtonStyle: {
      tintColor: 'white',
    }

});
export default App;
