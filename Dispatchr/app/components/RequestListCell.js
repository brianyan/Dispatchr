import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
var moment = require('moment');
var colorDictionary = {};
colorDictionary[1] = "yellow";
colorDictionary[0] = "green";

export default class RequestListCell extends Component {
  _getDateFromNow(){
    moment.updateLocale('en', {
    relativeTime : {
        future: "in %s",
        past: "%s",
        s:  " s",
        m:  " m",
        mm: "%d m",
        h:  "1 hr",
        hh: "%d hrs",
        d:  "1 d",
        dd: "%d d",
        M:  "1 m",
        MM: "%d m",
        y:  "1 y",
        yy: "%d y"
      }
    });
    var dateFromNow = moment(this.props.request.expiration_date, "YYYYMMDD").fromNow(true);
    return dateFromNow;
  }
  _assignBackgroundColor() {
    var bgColor = colorDictionary[this.props.request.status];
    return {
      backgroundColor: bgColor,
      height: 30,
      width: 30,
      borderRadius: 15,
    }
  }
  _getImageForUser(user) {
    var user_tag = 0;
    users = {}
    users["sal"] = 3;
    users["jordan"] = 5;
    users["alok"] = 1;
    users["brian"] = 2;
    users["spence"] = 4;
    var uri = "https://capstone.cs.ucsb.edu/team_docs_17/pics/appfolio/" + users[user.toLowerCase()] + ".jpg";
    return uri;
  }
  render() {
    return (
      <TouchableOpacity onPress={this.props.onSelect} >
        <View style={styles.container}>
          <Image style={styles.imageRound} source = {{ uri: this._getImageForUser(this.props.request.user.username)}}/>
          <View style={{flex: 5}}>
            <Text style={{fontWeight: 'bold'}}>
              {this.props.request.user.name} wants
            </Text>
            {this.props.request.request_items.map((requestItem) => {
              return <Text>{requestItem.item.name}</Text>
            })}
          </View>
          <View style={styles.flexColumn}>
            <View style={styles.dateTopFlexBox}>
              <View style={styles.dateFormat}>
                <Text style={styles.dateText}>
                expires in
                </Text>
              </View>
            </View>
            <View style={styles.dateBotFlexBox}>
              <View style={styles.dateFormat}>
                <Text style={styles.dateText}>
                {this._getDateFromNow()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  flexColumn: {
    // backgroundColor: 'red',
    flexDirection: 'column',
    flex: 1,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    // justifyContent: 'flex-start',
  },
  dateText: {
    fontSize: 9,
    fontFamily: 'Helvetica',
    fontWeight: "300",

  },
  dateTopFlexBox: {
    paddingVertical: 0,
    marginTop: 0,
    flex: 1,
    // backgroundColor: "blue",
    alignItems: 'flex-start',
    alignSelf: 'flex-end',
    // justifyContent: 'flex-end',
  },
  dateBotFlexBox: {
    paddingVertical: 0,
    marginTop: 0,
    flex: 15,
    // backgroundColor: "blue",
    alignItems: 'flex-start',
    alignSelf: 'flex-end',
    // justifyContent: 'flex-end',
  },
  dateFormat: {
    paddingHorizontal: 5,
    fontSize: 9,
    fontFamily: 'Helvetica',
    fontWeight: "400",
  },
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  imageRound: {
    marginLeft: 20,
    marginRight: 20,
    height: 40,
    borderRadius: 20,
    width: 40,
    alignSelf: 'center'
  }
});
