import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight} from 'react-native';

export default class NewRequestView extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
          <TouchableHighlight style={styles.buttonWrapper} onPress = {() =>  { console.log("Needed by...") } }>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Date Needed</Text>
              <Text style={styles.buttonText}>11/2/16</Text>
            </View>
          </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  buttonWrapper: {
    height: 50, 
    borderBottomColor: '#47315a', 
    borderBottomWidth: 1,
  },
  button: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 15,
  },
  buttonText: {
    fontSize: 16,
  },
});