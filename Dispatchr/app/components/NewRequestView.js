import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-datepicker';
import ItemList from './ItemList'
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
var moment = require('moment');

class NewRequestView extends Component {
  constructor(props){
    super(props);
    var today = new Date();
    moment(today).format('MMM Do YYYY')
    this.state = {
      date: today
    }
  }

  _newRequest() {
    this.props.newRequest({
      items: this.props.items,
      expirationDate: this.state.date
    });
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
              format="MMM DD YYYY"
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
          <ItemList onAddItem={this._itemAdded} />
          <TouchableOpacity underlayColor="transparent" style={styles.publishRequestButton} onPress = {() =>  { this._newRequest() } }>
            <Text style={styles.publishRequestButtonText}>Publish my Request</Text>
          </TouchableOpacity>
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
  publishRequestButtonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Helvetica Neue'
  }
});

/* Connects to the actions, so we can do stuff! Boilerplate!!! */
function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    newRequest: state.newRequest,
    items: state.items
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewRequestView);
