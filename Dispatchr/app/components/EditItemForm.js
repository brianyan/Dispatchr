import React, { Component } from 'react';
import { Text, View, StyleSheet} from 'react-native';

export default class EditItemForm extends Component {
  render() {
    return (
      <View>
        <Text style = {styles.red}>
          Edit Item For Here!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});
