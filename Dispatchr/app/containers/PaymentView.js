import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import renderIf from '../lib/renderif'
import { Actions } from 'react-native-router-flux'
import { firebaseApp } from '../../firebaseWrapper.js';

import {
  View,
  Text,
  ListView,
  TouchableHighlight,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  ScrollView,
  TextInput,
  Alert
} from 'react-native';

class PaymentView extends Component {
  constructor(props){
    super(props);
  }

  _alertRequestPayment(){
    Alert.alert(
      'Payment Request Sent!',
      "WOOO!",
      [
        {text: 'OK', onPress: () => {Actions.pop()}},
      ]
    )
  }

  render() {
    return (
      <View style = {{flex: 1, padding: 10}}>
        <View style={{flex: 1, flexDirection: 'row'}} >
          <View style={{flex: 1, padding: 5, backgroundColor: 'powderblue', justifyContent: 'center', alignItems: 'center'}}>
            <Text> {this.props.username} </Text>
          </View>
          <View style={{flex: 1, padding: 5, backgroundColor: 'steelblue', justifyContent: 'center', alignItems: 'center'}}>
            <TextInput
              style={{height: 30}}
              keyboardType='numeric'
              placeholder="$ Enter your price"
            />
          </View>
        </View>
        <View style={{flex: 8, padding: 10, backgroundColor: 'skyblue'}} >
          <TextInput
            style={{height: 30}}
            placeholder="Description"
          />
        </View>
        <View style={{flex: 1, backgroundColor: 'steelblue', justifyContent: 'center', alignItems: 'center'}} >
          <TouchableHighlight style={styles.sendPaymentButton} onPress = {() =>  { this._alertRequestPayment() } }>
            <Text style={styles.sendPaymentButtonText}> Payment</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}



function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    acceptRequest: state.acceptRequest,
    userInfo: state.userInfo,
  }
}

var styles = StyleSheet.create({
  sendPaymentButton: {
    flex: 0,
    backgroundColor : 'steelblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    height: 50
  },
  sendPaymentButtonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Helvetica Neue'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentView);
