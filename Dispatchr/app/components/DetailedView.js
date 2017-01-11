import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, TouchableHighlight} from 'react-native';
import { Actions} from 'react-native-router-flux';
// var MapView = require('react-native-maps');


export default class DetailedView extends Component {
  _alertAccept() {
    Alert.alert(
      'Request Accepted',
      "You're a hero!",
      [
        {text: 'OK', onPress: () => {Actions.pop()}},
      ]
    )
  }

  _alertHide() {
    Alert.alert(
      'Request Declined',
      "You'll get them next time!",
      [
        {text: 'OK', onPress: () => {Actions.pop()}},
      ]
    )
  }
  render() {

    return (
      <View style = {{flex: 1}}>
        <View style = {styles.attributeWrapper}>
          <Text style = {styles.attributeText}>
            Jordan wants...
          </Text>
          <Text style = {styles.attributeText}>
            - Water (Qty: 1 gallon, Max Price: 5)
          </Text>
          <Text style = {styles.attributeText}>
            - Chedder Cheese (Qty: 1 oz, Max Price: 2)
          </Text>
          <Text style = {styles.attributeText}>
            - Underwear (Qty: 6 pairs, Max Price: 3)
          </Text>
          <Text style = {styles.attributeText}>
            By 12/2/16
          </Text>
        </View>
        <View style={styles.content}>
          <TouchableHighlight style={{flex: 1, alignItems: 'center'}} onPress = {() => { this._alertAccept() }}>
            <Text> Accept </Text>
          </TouchableHighlight>
          <View style={styles.divider}></View>
          <TouchableHighlight style={{flex: 1, alignItems: 'center'}} onPress = {() => { this._alertHide() } }>
            <Text> Hide </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
    content: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderColor: '#EAEAEA',
        borderWidth: 1,
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
