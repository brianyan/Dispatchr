import React, { Component } from 'react';
import { Image, Text, TouchableHighlight, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux'
import FireBaseChat from '../containers/FireBaseChat'
var moment = require('moment');

var options = {
    month: "short", day: "numeric", year: "numeric"
};

export default class DetailedViewRequestProfile extends Component {
  constructor(props){
    super(props);
  }
  _renderDate() {
    var date_string = this.props.request.expiration_date;
    var date = new Date(date_string);
    return moment(date).format('MMM DD YYYY');
  }

  _onChatPress(){
    Actions.FireBaseChat();
  }

  _onPhonePress(){
  }

  render() {
    return (
      <View style={styles.viewContainer}>
        <Image style={styles.imageRound} source = {{uri: 'https://capstone.cs.ucsb.edu/team_docs_17/pics/appfolio/2.jpg'}}/>
        <View style= {{flexDirection: 'column'}}>
          <Text style = {styles.boldTextAttribute}>
            {this.props.request.user.name}
          </Text>
          <Text>
            <Text style={styles.boldTextAttribute}>
              Date needed by:
            </Text>
            <Text style={styles.textAttribute}>
              {this._renderDate()}
            </Text>
          </Text>
        </View>
        <View style = {styles.chatIconstyle}>
          <TouchableHighlight onPress={this._onChatPress}>
            <Icon name="ios-chatboxes" marginLeft = {20} size={25} color="black" />
          </TouchableHighlight>
          {/*// <TouchableHighlight onPress={this._onPhonePress}>
          //   <Icon name="ios-call" marginLeft = {20} size={25} color="black" />
          // </TouchableHighlight>*/}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  chatIconstyle: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
  boldTextAttribute: {
    fontWeight: 'bold',
  },
  textAttribute: {
    fontSize: 12,
  },
  viewContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#f0f8ff',
    flexDirection: 'row',
    paddingVertical:10,
  },
  imageRound: {
    marginLeft: 20,
    marginRight: 20,
    height: 40,
    borderRadius: 20,
    width: 40
  }
});
