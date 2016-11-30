import React, { Component } from 'react';
import { Text, TouchableHighlight, View, StyleSheet} from 'react-native';

export default class RequestListCell extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onSelect}>
        <View>
          <Text style={{fontWeight: 'bold'}}>
            {this.props.request.user.name}
          </Text>
          {this.props.request.request_items.map((requestItem) => {
            return <Text>{requestItem.item.name}</Text>
          })}
        </View>
      </TouchableHighlight>
    );
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
});
