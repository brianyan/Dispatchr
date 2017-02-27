import React, { Component } from 'react';
import { Text, TouchableHighlight, View, StyleSheet} from 'react-native';
import moment from 'moment';

export default class NotificationCell extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onSelect}>
        <View>
          <Text style={styles.message}>
            {this.props.notification.message}
          </Text>
          <Text style={styles.date}>
            {moment(Date.parse(this.props.notification.created_at)).format('[Received on] MMMM Do YYYY [at] h:mm a')}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  message: {
    fontWeight: 'bold',
    padding: 10,
    paddingBottom: 0
  },
  date: {
    padding: 10
  }
});
