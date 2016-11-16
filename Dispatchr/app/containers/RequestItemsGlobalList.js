import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import renderIf from '../lib/renderif'
import { Actions } from 'react-native-router-flux'
import {
  View,
  Text,
  ListView,
  TouchableHighlight,
  RefreshControl,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

class RequestItemsGlobalList extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      refreshing: false,
      dataSource: ds,
      showFetchButton: true
    };
    this.props.getRequestItems();
  }

  componentWillReceiveProps() {

    this.setState({
      refreshing: false,
      dataSource: this.state.dataSource.cloneWithRows(this.props.requestedItems),
      showFetchButton: this.props.requestedItems.length == 0
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {renderIf(this.state.showFetchButton)(
          <TouchableHighlight onPress = {() =>  {this.props.getRequestItems()} }>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Press me to Refresh!</Text>
            </View>
          </TouchableHighlight>
       )}

       {renderIf(!this.state.showFetchButton)(
        <ListView style={{flex:1}}
          refreshControl={<RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderSeparator={this._renderSeparator}
          renderFooter={this._renderFooter}
          enableEmptySections={true}
        />
        )}
    </View>
    );
  }

  _onRefresh() {
   this.setState({refreshing: true});
   this.props.getRequestItems();
 }

 _renderRow(rowData, sectionId, rowId, highlightRow) {
   const rowAction = () => {
    highlightRow(sectionId, rowId);
     Actions.DetailedView({rowData});
   };
   return (
    <TouchableHighlight onPress={rowAction}>
       <View>
         <View style={styles.row}>
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
   <View style={styles.footerContainer}>
    <TouchableOpacity style={styles.button} onPress={() => console.log('load more')}>
      <Text style={styles.text}>Load More</Text>
    </TouchableOpacity>
    </View>
 }

}

var styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  footerContainer: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
      borderColor: '#8E8E8E',
      borderWidth: StyleSheet.hairlineWidth,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#8E8E8E'
  },
  text: {
    flex: 1,
  },
});

/* Connects to the actions, so we can do stuff! Boilerplate!!! */
function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    requestedItems: state.requestedItems
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestItemsGlobalList);
