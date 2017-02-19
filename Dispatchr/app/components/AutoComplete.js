import  React, { Component }  from 'react';
import {
    StyleSheet,
    Text,
    View,
    AlertIOS,
} from 'react-native';

import AutoComplete from 'react-native-autocomplete';
import Products from './products.json';

export default class AutoCompleteComponent extends Component {

  state = { data: [] }

  constructor(props) {
    super(props);
    this.onTyping = this.onTyping.bind(this)
  }

  onTyping(text) {
    const countries = Products
        .filter(product => product.name.toLowerCase().startsWith(text.toLowerCase()))
        .map(product => product.name);

    this.setState({ data: countries });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
        Search for a product
        </Text>
        <AutoComplete
          onTyping={this.onTyping}
          suggestions={this.state.data}

          placeholder="This is a great placeholder"
          style={styles.autocomplete}
          clearButtonMode="always"
          returnKeyType="go"
          textAlign="center"
          clearTextOnFocus

          maximumNumberOfAutoCompleteRows={10}
          applyBoldEffectToAutoCompleteSuggestions
          reverseAutoCompleteSuggestionsBoldEffect
          showTextFieldDropShadowWhenAutoCompleteTableIsOpen={false}
          autoCompleteTableViewHidden={false}

          autoCompleteTableBorderColor="lightblue"
          autoCompleteTableBackgroundColor="azure"
          autoCompleteTableCornerRadius={10}
          autoCompleteTableBorderWidth={1}

          autoCompleteRowHeight={35}

          autoCompleteFontSize={15}
          autoCompleteRegularFontName="Helvetica Neue"
          autoCompleteBoldFontName="Helvetica Bold"
          autoCompleteTableCellTextColor={'red'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  autocomplete: {
    alignSelf: 'stretch',
    height: 50,
    backgroundColor: '#FFF',
    borderColor: 'lightblue',
    borderWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 50,
  },
});
