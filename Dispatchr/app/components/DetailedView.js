import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet, Alert, TouchableHighlight, AsyncStorage} from 'react-native';
import { Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import DetailedViewRequestProfile from './DetailedViewRequestProfile';
import renderIf from '../lib/renderif'

class DetailedView extends Component {
  constructor(props){
    super(props);
    this.state = {
      showCancelOption: false
    }
    console.log("hello");
    console.log(AsyncStorage.getItem('currentUserId'));
    this._determineCancelOrHide = this._determineCancelOrHide.bind(this)
  }
  componentDidMount(){
    console.log("reached1");
    this._determineCancelOrHide();
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
  async _determineCancelOrHide(){
    console.log("reached");
    // find out what the text needs to be , either you are the user who submitted the request, and you can cancel the request
    // otherwise, you are any other user, therefore you should be able to hide the request if you don't want to see it.
    this.props.showCancelOption = false;
    try {
      const value = await AsyncStorage.getItem('currentUserId');
      console.log("reached", value);
      if (value !== null){
        if(value === this.props.request.user.username){
          this.state.showCancelOption = true;
        }
        // We have data!!
      }
    } catch (error) {
      // Error retrieving data
    }
  }
  render() {
    return (
      <View style = {{flex: 1}}>
          <DetailedViewRequestProfile request = {this.props.request}></DetailedViewRequestProfile>
          <ScrollView>
            {this.props.request.request_items.map((requestItem) => {
              return <View style = {styles.seperator}><Text>{requestItem.quantity_description} {requestItem.item.name} {/*}{requestItem.max_price}*/} {"\n"}</Text></View>
            })}
            </ScrollView>
          <View style={styles.content}>
            <TouchableHighlight style={{flex: 1, alignItems: 'center'}} onPress = {() => { this._acceptRequest() }}>
              <Text> Accept </Text>
            </TouchableHighlight>
            <View style={styles.divider}></View>
           {renderIf(this.state.showCancelButton)(
             <TouchableHighlight style={{flex: 1, alignItems: 'center'}} onPress = {() => { this._alertCancel() } }>
               <Text> Cancel </Text>
             </TouchableHighlight>
           )}
           {renderIf(!(this.state.showCancelButton))(
             <TouchableHighlight style={{flex: 1, alignItems: 'center'}} onPress = {() => { this._alertHide() } }>
               <Text> Hide </Text>
             </TouchableHighlight>
           )}
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
    acceptRequest: state.acceptRequest
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailedView);
