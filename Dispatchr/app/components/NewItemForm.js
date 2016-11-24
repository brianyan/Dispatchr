import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import TextField from 'react-native-md-textinput';
import { Text, TextInput,  View, StyleSheet, TouchableHighlight} from 'react-native';

class ItemNameInput extends Component {
  render() {
    return (
      <View>
        <TextField label={'Name'} highlightColor={'#00BCD4'} />
      </View>
    )
  }
}

class QuantityInput extends Component {
  render() {
    return (
      <View>
        <TextField
            label={'Qty.'}
            highlightColor={'#00BCD4'}
            keyboardType={'numeric'}
        />
      </View>
    )
  }
}

class NewItemForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <View>
          <Field name="ItemName" component={ItemNameInput}  />
          <Field name="Quantity" component={QuantityInput}  />
      </View>
    );
  }
}

// Decorate the form component
NewItemForm = reduxForm({
  form: 'newRequest' // a unique name for this form
})(NewItemForm);

export default NewItemForm;