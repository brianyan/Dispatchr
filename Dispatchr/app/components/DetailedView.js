import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet, Alert, TouchableOpacity, AsyncStorage} from 'react-native';
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
      username: this.props.request.user.username
    }
  }
  _acceptRequest(username, status) {
    if(status === 0){
      this.props.acceptRequest(this.props.request);
    } else {
      Actions.PaymentView({username})
    }
    this.props.getRequests;
  }
  _alertCancel(username, status){
    Alert.alert(
      'Request Cancelled',
      "Nooooooooo!",
      [
        { text: 'OK', onPress: () => { Actions.pop() } },
      ]
    )
    this.props.getRequests;
  }
  _alertHide(username) {
    // Alert.alert(
    //   'Request Declined',
    //   "You'll get them next time!",
    //   [
    //     // {text: 'OK', onPress: () => { Actions.PaymentView({username}) }},
    //     {text: 'OK', onPress: () => { Actions.pop() } },
    //   ]
    // )
    this.props.deleteRequest(this.props.request);
    this.props.getRequests;
  }
  _getCompleteOrAccept(status){
    var text = "";
    if (this.props.request.user.username === "Drake") {
      text = "Edit";
    }
    else if(status === 0) {
      text = "Accept";
    } else {
      text = "Complete";
    }
    console.log(status);
    console.log(text);
    return <Text style={styles.acceptText}> {text} </Text>
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
            <View style={styles.ButtonView}>
              <TouchableOpacity underlayColor="transparent" style={{flex: 1, backgroundColor: '#4CAF50', justifyContent: 'center'}} onPress = {() => { this._acceptRequest(this.state.username, this.props.request.status) }}>
                {this._getCompleteOrAccept(this.props.request.status)}
              </TouchableOpacity>
            </View>
            <View style={styles.divider}></View>
           {renderIf(this.state.showCancelOption)(
             <View style={styles.ButtonView}>
               <TouchableOpacity underlayColor="transparent" style={{flex: 1, justifyContent: 'center', backgroundColor: 'red'}} onPress = {() => { this._alertCancel() } }>
                <Text style={styles.cancelText}> Cancel </Text>
               </TouchableOpacity>
             </View>
           )}
           {renderIf(!(this.state.showCancelOption))(
             <View style={styles.ButtonView}>
               <TouchableOpacity underlayColor="transparent" style={{flex: 1, justifyContent: 'center', backgroundColor: 'gray'}} onPress = {() => { this._alertHide(this.state.username) } }>
                 <Text style={styles.hideText}> Hide </Text>
               </TouchableOpacity>
             </View>
           )}
          </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
    hideText: {
      color: 'white',
      textAlign: 'center',
    },
    cancelText: {
      textAlign: 'center',
      color: 'white',
    },
    acceptText: {
      textAlign: 'center',
      color: 'white',
    },
    ButtonView: {
      flex: 1,
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
    deleteRequest: state.deleteRequest,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailedView);
