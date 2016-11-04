import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import * as requestsActions from './actions';
import { connect } from 'react-redux';

class RequestsList extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.getRequests}>
        <Text>Hi</Text>
        <Text>{JSON.stringify(this.props)}</Text>
      </TouchableOpacity>
    );
  }
}

export default connect(state => ({
    state: state.requestsReducer
  }),
  (dispatch) => ({
    actions: bindActionCreators(requestsActions, dispatch)
  })
)(RequestsList);
