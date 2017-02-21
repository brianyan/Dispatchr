import React, { Component } from 'react';
import { Text, TouchableHighlight, View, StyleSheet} from 'react-native';

var colorDictionary = {};
colorDictionary[1] = "yellow";
colorDictionary[0] = "green";

export default class RequestListCell extends Component {
  _assignBackgroundColor() {
    var bgColor = colorDictionary[this.props.request.status];
    return {
      backgroundColor: bgColor,
      height: 30,
      width: 30,
      borderRadius: 15,
    }
  }
  render() {
    return (
      <TouchableHighlight onPress={this.props.onSelect}>
        <View style={styles.flexRow}>
          <View style={{flex: 5}}>
            <Text style={{fontWeight: 'bold'}}>
              {this.props.request.user.name}
            </Text>
            {this.props.request.request_items.map((requestItem) => {
              return <Text>{requestItem.item.name}</Text>
            })}
          </View>

          <View style={styles.colorCodingBox}>
            <View style={this._assignBackgroundColor()}>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  colorCodingBox: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  }
});
