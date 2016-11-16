import React, { Component } from 'react';
import { Text, View, StyleSheet} from 'react-native';

export default class DetailedView extends Component {
  render() {
    return (
      <View>
        <Text style = {styles.red}>
          {this.props.rowData}
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
