import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight} from 'react-native';

export default class NewRequestView extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
          <TouchableHighlight style={styles.buttonWrapper} onPress = {() =>  { console.log("Needed by...") } }>
            <View style={styles.neededByButton}>
              <Text style={styles.buttonText}>Date Needed</Text>
              <Text style={styles.buttonText}>11/2/16</Text>
            </View>
          </TouchableHighlight>
          <Text style={{flex: 1}}> Hello! </Text>
          <TouchableHighlight style={styles.publishRequestButton} onPress = {() =>  { console.log("Needed by...") } }>
            <Text style={styles.buttonText}>Publish my Request</Text>
          </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  buttonWrapper: {
    height: 50, 
    borderBottomWidth: 1,
  },
  neededByButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 15,
  },
  buttonText: {
    fontSize: 16,
  },
  publishRequestButton: {
    flex: 0,
    color: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    height: 50
  },
});