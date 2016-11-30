import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight} from 'react-native';
import { Actions} from 'react-native-router-flux'
// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import { Hideo } from 'react-native-textinput-effects';

// Form setup
var t = require('tcomb-form-native');
var Form = t.form.Form;

var User = t.struct({
  username: t.String
});

var options = {
  auto: 'placeholders'
}

export default class UserLogin extends Component {
  _loginAction() {
    Actions.RequestsList();
  };

  render() {
    return (
      <View style = {styles.container}>
      <Form
        ref = "form"
        type = {User}
        options = {options}
      />
      <TouchableHighlight style={styles.button} onPress={this._loginAction.bind(this)}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableHighlight>
        {/*// <Text style = {styles.red}>
        //   LOGIN HERE
        // </Text>
        // <Hideo
        //   iconClass={FontAwesomeIcon}
        //   iconName={'envelope'}
        //   iconColor={'white'}
        //   // this is used as backgroundColor of icon container view.
        //   iconBackgroundColor={'#f2a59d'}
        //   inputStyle={{ color: '#464949' }}
        // />
        // <Text> Hello </Text>
        // <Hideo
        //   style = {styles.card2}
        //   iconClass={FontAwesomeIcon}
        //   iconName={'user-circle'}
        //   iconColor={'white'}
        //   // this is used as backgroundColor of icon container view.
        //   iconBackgroundColor={'#f2a59d'}
        //   inputStyle={{ color: '#464949' }}
        // />
        */}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
