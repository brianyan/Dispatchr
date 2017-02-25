import React, { Component } from 'react';
import { Text, TextInput,  View, StyleSheet, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';

// Form setup
var t = require('tcomb-form-native');
var Form = t.form.Form;

// here we are: define your domain model
var Item = t.struct({
  name: t.String,
  quantity_description: t.String,
  max_price: t.Number
});

var options = {
  fields: {
    name: {
      label: 'Item Name',
      placeholder: 'What do you need?'
    },
    quantity_description: {
      placeholder: 'How much do you need?',
    },
    max_price: {
      placeholder: 'How much are you willing to pay?',
      error: 'Only numbers please!'
    }
  }
}; // optional rendering options (see documentation)

class NewItemForm extends Component {
  onPress() {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      this.props.addItem(value);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* display */}
        <Form
          ref = "form"
          type={Item}
          options={options}
        />
        <TouchableOpacity style={styles.button} onPress={this.onPress.bind(this)} underlayColor="transparent">
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
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

/* Connects to the actions, so we can do stuff! Boilerplate!!! */
function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    items: state.items
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewItemForm);
