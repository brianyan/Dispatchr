import React, { Component } from 'react';
import TextField from 'react-native-md-textinput';
import Button from 'apsl-react-native-button';
import { Text, View, StyleSheet} from 'react-native';
import NewRequestForm from './NewRequestForm'

export default class NewRequestView extends Component {
  handleSubmit = (values) => {
    console.log(values);
  }
  render() {
    return (
      <NewRequestForm onSubmit={this.handleSubmit} />
    );
  }
}

