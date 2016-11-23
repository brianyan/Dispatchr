import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight} from 'react-native';
import DatePicker from 'react-native-datepicker';

export default class NewRequestView extends Component {
  constructor(props){
    super(props)
    this.state = { date: "2016-11-01" }
  }

  render() {
    return (
      <View style={{flex: 1}}>
          <View style={styles.expirationButton}>
            <Text style={{fontSize: 16, color: '#77c2e5' }}>Date Needed</Text>
            <DatePicker
              style={{width: 100}}
              date={this.state.date}
              mode="date"
              placeholder="placeholder"
              format="YYYY-MM-DD"
              minDate="2016-11-01"
              maxDate="2017-11-01"
              confirmBtnText="Confirm"
              showIcon={false}
              cancelBtnText="Cancel"
              onDateChange={(date) => {this.setState({date: date})}}
              customStyles={{
                dateInput: {
                  borderWidth: 0,
                },
                 dateText: {
                  fontSize: 16,
                },
              }}
            />
          </View>
          <Text style={{flex: 1}}> Hello! </Text>
          <TouchableHighlight style={styles.publishRequestButton} onPress = {() =>  { console.log("Needed by...") } }>
            <Text style={{fontSize: 16}}>Publish my Request</Text>
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
    alignItems: 'center',
    paddingHorizontal: 20,
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