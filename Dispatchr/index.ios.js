import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import App from './App';

export default class Dispatchr extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('Dispatchr', () => Dispatchr);
