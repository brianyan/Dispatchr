import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ListFilterButton extends Component {
  constructor(props) {
    super(props);
    this.state = {leftColor: 'black', rightColor: 'grey'};
  }

  render() {
    return (
      <View style={styles.content}>
        <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={this._leftSideSelected.bind(this)}>
          <Icon name="globe" size={25} color={this.state.leftColor} />
        </TouchableOpacity>
        <View style={styles.divider}></View>
        <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={this._rightSideSelected.bind(this)}>
          <Icon name="user" size={25} color={this.state.rightColor} />
        </TouchableOpacity>
      </View>
    );
  }

  _leftSideSelected() {
    this.setState({
      leftColor: 'black',
      rightColor: 'grey'
    });
    this.props.leftSideSelected();
  }

  _rightSideSelected() {
    this.setState({
      leftColor: 'grey',
      rightColor: 'black'
    });
    this.props.rightSideSelected();
  }
}

const styles = StyleSheet.create({
    content: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderColor: '#EAEAEA',
        borderWidth: 1
    },
    buttonText: {
        fontSize: 20
    },
    divider: {
      backgroundColor: '#EAEAEA',
      width: 1,
      height: 35,
      marginTop: 5,
      marginBottom: 5
    }
});
