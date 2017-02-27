import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux'
import FireBaseChat from '../containers/FireBaseChat'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
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

  _getImageForUser(user) {
    var user_tag = 0;
    users = {}
    users["sal"] = 3;
    users["jordan"] = 5;
    users["alok"] = 1;
    users["brian"] = 2;
    users["spence"] = 4;

    if(user === "Drake"){
      var uri = "https://s3.amazonaws.com/filepicker-images-rapgenius/aIFhO1NSQK1KcbpRtvgQ_drake.jpg"
    } else {
      var uri = "https://capstone.cs.ucsb.edu/team_docs_17/pics/appfolio/" + users[user.toLowerCase()] + ".jpg";
    }
    return uri;
  }
  render() {
    return (
      <View style={styles.viewContainer}>
        <Image style={styles.imageRound} source = {{ uri: this._getImageForUser(this.props.request.user.username)}}/>
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
          <TouchableOpacity underlayColor="transparent" onPress={this._onChatPress}>
            <FontAwesomeIcon name="comment" size={25} color='#48BBEC'/>
          </TouchableOpacity>
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
    marginBottom: 5,
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
