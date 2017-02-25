import React, { Component } from 'react';
import { Text, TouchableHighlight, View, StyleSheet, Image } from 'react-native';
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
        s:  "s",
        m:  "m",
        mm: "%dm",
        h:  "1hr",
        hh: "%dhrs",
        d:  "1day",
        dd: "%dd",
        M:  "1m",
        MM: "%dm",
        y:  "1y",
        yy: "%dy"
      }
    });
    var dateFromNow = moment(this.props.request.expiration_date, "YYYYMMDD").fromNow(true)
    return dateFromNow

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
  render() {
    return (
      <TouchableHighlight onPress={this.props.onSelect}>
        <View style={styles.container}>
          <Image style={styles.imageRound} source = {{uri: 'https://capstone.cs.ucsb.edu/team_docs_17/pics/appfolio/2.jpg'}}/>
          <View style={{flex: 5}}>
            <Text style={{fontWeight: 'bold'}}>
              {this.props.request.user.name} wants
            </Text>
            {this.props.request.request_items.map((requestItem) => {
              return <Text>{requestItem.item.name}</Text>
            })}
          </View>

          <View style={styles.colorCodingBox}>
            <View style={styles.dateFormat}>
              <Text>
              {this._getDateFromNow()}
              </Text>
            </View>

          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  colorCodingBox: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  dateFormat: {
    paddingHorizontal: 5,
    fontSize: 8,
    fontFamily: 'Helvetica Neue',
    fontWeight: "200"
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
