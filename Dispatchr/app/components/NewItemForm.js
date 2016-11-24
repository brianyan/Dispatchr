import React, { Component } from 'react';
import { Text, TextInput,  View, StyleSheet, TouchableHighlight} from 'react-native';

// Form setup
var t = require('tcomb-form-native');
var Form = t.form.Form;

// here we are: define your domain model
var Item = t.struct({
  itemName: t.String,
  quantity: t.Number,
});

var options = {
  fields: {
    itemName: {
      label: 'Item Name',
      placeholder: 'What do you need?'
    },
    quantity: {
      placeholder: 'How much do you need?',
      error: 'Only numbers please!'
    }
  }
}; // optional rendering options (see documentation)

export default class NewItemForm extends Component {
  onPress() {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Person
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* display */}
        <Form
          ref="form"
          type={Item}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
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