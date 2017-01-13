import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, TouchableHighlight} from 'react-native';
import { Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';

var options = {
    weekday: "long", year: "numeric", month: "short",
    day: "numeric", hour: "2-digit", minute: "2-digit"
};

class DetailedView extends Component {
  _acceptRequest() {
    this.props.acceptRequest(this.props.request);
    console.log(this.props.request)
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
  _renderDate() {
    var date_string = this.props.request.expiration_date
    var date = new Date(date_string)
    return date.toLocaleTimeString("en-us", options)
  }
  render() {
    console.log(this.props.request)
    return (
      <View style = {{flex: 1}}>
        <View style = {styles.attributeWrapper}>
          <Text style = {styles.attributeText}>
            {this.props.request.user.name}
          </Text>
          {this.props.request.request_items.map((requestItem) => {
            return <Text>{requestItem.item.name}{"\n"} {requestItem.max_price} {"\n"} Qty {requestItem.quantity_description} {"\n"} </Text>
          })}
          <Text style = {styles.attributeText}>
            {this._renderDate()}
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
