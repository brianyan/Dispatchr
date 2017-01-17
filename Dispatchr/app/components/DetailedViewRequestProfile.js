import React, { Component } from 'react';
import { Image, Text, TouchableHighlight, View, StyleSheet} from 'react-native';
var moment = require('moment');

var options = {
    month: "short", day: "numeric", year: "numeric"
    //day: "numeric", hour: "2-digit", minute: "2-digit", weekday: "long"
};

export default class DetailedViewRequestProfile extends Component {
  _renderDate() {
    var date_string = this.props.request.expiration_date
    var date = new Date(date_string)
    // console.log("date", date)
    // console.log(this.props.request.expiration_date)
    // console.log(date.toLocaleTimeString("en-us", options))
    //
    // console.log(moment(date).for)
    return moment(date).format('MMM Mo YYYY')
    // return date.toLocaleTimeString("en-us", options)
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
    borderBottomWidth: 1,
    height: 75,
    flex: 1,
    flexDirection: 'row',
    marginTop:25,
  },
  imageRound: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 25,
    height: 50,
    borderRadius: 25,
    width: 50
  }
});
