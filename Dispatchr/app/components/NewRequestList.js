import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView, TouchableHighlight, TouchableOpacity} from 'react-native';


export default class NewRequestList extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };
  }
  render() {
    return (
      <ListView
        style={{flex: 1}}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        renderSeparator={this._renderSeparator}
        renderFooter={this._renderFooter}

      />
    );
  }

  _renderRow(rowData, sectionId, rowId, highlightRow) {
    const rowAction = () => {
      highlightRow(sectionId, rowId);
    };
    return (
      <TouchableHighlight onPress={rowAction}>
         <View>
           <View style={styles.rowContainer}>
             <Text style={styles.text}>
               {rowData}
             </Text>
           </View>
         </View>
       </TouchableHighlight>
    );
  }

  _renderSeparator(sectionId, rowId) {
    return (
      <View key={rowId} style={styles.separator} />
    );
  }

  _renderFooter(){
    return( 
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.button} onPress={() => console.log('adding request')}>
        <Text style={styles.text}>Add a request!</Text>
      </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  footerContainer: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
      borderColor: '#8E8E8E',
      borderWidth: 1,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
  },
  text: {
    flex: 1,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});
