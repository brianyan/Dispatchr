import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet} from 'react-native';

export default class ListFilterButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.content}>
        <TouchableOpacity style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.buttonText}>Global</Text>
        </TouchableOpacity>
        <View style={styles.divider}></View>
        <TouchableOpacity style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.buttonText}>My List</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    content: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    buttonText: {
        fontSize: 20
    },
    divider: {
      backgroundColor: '#EAEAEA',
      width: 1,
      height: 35,
      marginTop: 5,
      marginBottom: 5
    }
});
