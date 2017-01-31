import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import { Provider } from 'react-redux';
import { store } from './configureStore';
import { firebaseConfig } from './config.firebase'
import App from './app/containers/App';
import * as firebase from 'firebase';

const firebaseApp = firebase.initializeApp(firebaseConfig);

class Dispatchr extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Dispatchr', () => Dispatchr);
