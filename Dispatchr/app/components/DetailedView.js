import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, TouchableHighlight} from 'react-native';
import { Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
// var MapView = require('react-native-maps');

class DetailedView extends Component {
  _acceptRequest() {
    this.props.acceptRequest(this.props.request);
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
          <TouchableHighlight style={{flex: 1, alignItems: 'center'}} onPress = {() => { this._acceptRequest() }}>
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

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    acceptRequest: state.acceptRequest
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailedView);
