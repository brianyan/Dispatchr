import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, TouchableHighlight} from 'react-native';
import { Actions} from 'react-native-router-flux';
var MapView = require('react-native-maps');


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
            {this.props.rowData.id}
          </Text>
          <Text style = {styles.attributeText}>
            {this.props.rowData.name}
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

// var styles = StyleSheet.create({
//   HideButton: {
//     backgroundColor : 'red',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderTopWidth: 1,
//     height: 50,
//     flex: 0
//   },
//   AcceptButton: {
//     backgroundColor : 'green',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderTopWidth: 1,
//     height: 50,
//     flex: 0
//   },
//   buttonWrapper: {
//     flexDirection: 'row',
//     flex: 0,
//   },
//   attributeWrapper: {
//     flexDirection: 'row',
//     flex: 1,
//   },
//   attributeText: {
//     fontSize: 18,
//     fontFamily: "Helvetica Neue",
//     color: '#48BBEC',
//     alignSelf: 'center',
//     marginTop: 10,
//   },
//   buttonText:{
//     color: 'white'
//   },
// });
