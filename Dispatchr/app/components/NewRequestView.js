import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight} from 'react-native';
import DatePicker from 'react-native-datepicker';

export default class NewRequestView extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
          <View style={styles.expirationButton}>
            <Text style={{fontSize: 16}}>Date Needed</Text>
            <DatePicker
              style={{width: 200}}
              date={'2016-05-01'}
              mode="date"
              placeholder="placeholder"
              format="YYYY-MM-DD"
              minDate="2016-05-01"
              maxDate="2016-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={(date) => {console.log('data changed')}}
            />
          </View>
          <Text style={{flex: 1}}> Hello! </Text>
          <TouchableHighlight style={styles.publishRequestButton} onPress = {() =>  { console.log("Needed by...") } }>
            <Text style={styles.buttonText}>Publish my Request</Text>
          </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  expirationButton: {
    height: 50, 
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  publishRequestButton: {
    flex: 0,
    backgroundColor : '#77c2e5',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    height: 50
  },
});