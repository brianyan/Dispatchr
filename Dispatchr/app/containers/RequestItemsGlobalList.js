import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import {
  View,
  Text,
  ListView,
  TouchableHighlight,
  RefreshControl,
  StyleSheet
} from 'react-native';

class RequestItemsGlobalList extends Component {
  constructor(props) {
    super(props);
  };

  getRequestItems(){
    this.props.getRequestItems();
  }

  render() {
    return (
      <View>
        <TouchableHighlight onPress = {() =>  {this.getRequestItems()} }>
          <Text>Press me!</Text>
        </TouchableHighlight>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  text: {
    flex: 1,
  },
});

/* Connects to the actions, so we can do stuff! Boilerplate!!! */
function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(() => { return {} }, mapDispatchToProps)(RequestItemsGlobalList);
