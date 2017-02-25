import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet, Alert, TouchableHighlight, AsyncStorage} from 'react-native';
import { Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import DetailedViewRequestProfile from './DetailedViewRequestProfile';
import DetailedViewCell from './DetailedViewCell';
import renderIf from '../lib/renderif'


class DetailedView extends Component {
  constructor(props){
    super(props);
    this.state = {
      showCancelOption: this.props.userInfo === this.props.request.user.username ? true : false,
    }
  }
  _acceptRequest() {
    this.props.acceptRequest(this.props.request);
  }
  _alertCancel(){
    Alert.alert(
      'Request Cancelled',
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
          <DetailedViewRequestProfile request = {this.props.request}></DetailedViewRequestProfile>
          <ScrollView style={styles.scrollView}>
            {this.props.request.request_items.map((requestItem) => {
              return <DetailedViewCell requestItem = {requestItem}/>
            })}
            </ScrollView>
          <View style={styles.content}>
            <View style={styles.acceptButtonView}>
              <TouchableHighlight style={{flex: 1, backgroundColor: 'green', justifyContent: 'center'}} onPress = {() => { this._acceptRequest() }}>
                <Text style={styles.acceptText}> Accept </Text>
              </TouchableHighlight>
            </View>
            <View style={styles.divider}></View>
           {renderIf(this.state.showCancelOption)(
             <TouchableHighlight style={{flex: 1, alignItems: 'center', backgroundColor: 'red'}} onPress = {() => { this._alertCancel() } }>
               <Text> Cancel </Text>
             </TouchableHighlight>
           )}
           {renderIf(!(this.state.showCancelOption))(
             <TouchableHighlight style={{flex: 1, alignItems: 'center', backgroundColor: 'red'}} onPress = {() => { this._alertHide() } }>
               <Text> Hide </Text>
             </TouchableHighlight>
           )}
          </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
    acceptText: {
      textAlign: 'center',
      color: 'white',
    },
    acceptButtonView: {
      flex: 1,
      backgroundColor: 'green',
    },
    scrollView: {
      backgroundColor: '#f0f8ff',
    },
    content: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        // borderColor: '#EAEAEA',
        // borderWidth: 1,
    },
    separator: {
      flex: 1,
      height: StyleSheet.hairlineWidth,
      backgroundColor: '#8E8E8E',
      borderColor: '#f0f8ff'
    },
    seperator: {
      borderBottomWidth: 1,
      borderColor: "gray",
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
    acceptRequest: state.acceptRequest,
    userInfo: state.userInfo,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailedView);
