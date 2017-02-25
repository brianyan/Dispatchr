import React, { Component } from 'react';
import { Text, TouchableHighlight, View, StyleSheet, Image } from 'react-native';
var moment = require('moment');

export default class DetailedViewCell extends Component {
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
    return dateFromNow;
  }
  render() {
    return (
          <View style={styles.containerRow}>
            <View style={styles.itemDescription}>
              <Text style={styles.boldTextAttribute}> {this.props.requestItem.item.name}</Text>
              <Text> {this.props.requestItem.quantity_description} ct </Text>
            </View>
            <View style={styles.itemPrice}>
              <Text style={styles.itemPriceText}>${this.props.requestItem.max_price} </Text>
            </View>
        </View>
        // <View style={styles.container}>
        //   <Image style={styles.imageRound} source = {{uri: 'https://capstone.cs.ucsb.edu/team_docs_17/pics/appfolio/2.jpg'}}/>
        //   <View style={{flex: 5}}>
        //     <Text style={{fontWeight: 'bold'}}>
        //       {this.props.request.user.name} wants
        //     </Text>
        //     {this.props.request.request_items.map((requestItem) => {
        //       return <Text>{requestItem.item.name}</Text>
        //     })}
        //   </View>
        //
        //   </View>
        // </View>

    );
  }
}

const styles = StyleSheet.create({
  itemPriceText: {
    fontWeight: 'bold',
  },
  itemDescription: {
    flex: 3,
    // backgroundColor: 'blue',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
  },
  itemPrice: {
    // backgroundColor: 'green',
    flex: 2,
    alignItems: 'flex-end',
    alignSelf: 'center',
    paddingRight: 10,
  },
  containerRow: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#EAEAEA',
    // marginLeft: 20,
  },
  content: {
    flex: 1,
    flexDirection:'row',
    marginTop: 10,
    borderColor: '#EAEAEA',
    // borderWidth: 1,
  },
  imageRound: {
    marginLeft: 20,
    marginRight: 20,
    height: 40,
    borderRadius: 20,
    width: 40,
    alignSelf: 'center'
  },
  divider: {
    backgroundColor: '#EAEAEA',
    width: 1,
    height: 30,
    marginBottom: 5
  }
});
