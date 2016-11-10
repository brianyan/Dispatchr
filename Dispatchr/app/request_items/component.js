import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import * as requestsActions from './actions';
import { connect } from 'react-redux';

class RequestsList extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.getRequestItems}>
        <Text>Hi</Text>
        <Text>{JSON.stringify(this.props)}</Text>
      </TouchableOpacity>
    );
  }
}

export default connect(state => ({
    requests: state.requestItemsReducer
  }),
  {
    getRequestItems: requestsActions.getRequestItems,
  }
)(RequestsList);
