import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
  TouchableHighlight,
  RefreshControl,
  StyleSheet } from 'react-native';
import * as requestsActions from './actions';
import { connect } from 'react-redux';

class RequestItemsList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      refreshing: false,
      dataSource: ds,
    };

    this.props.getRequestItems();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      refreshing: false,
      dataSource: this.state.dataSource.cloneWithRows(nextProps.request_items)
    })
  }

  render() {
    return (
      <ListView
        refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
      />
    );
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.props.getRequestItems();
  }

  _renderRow(rowData, sectionId, rowId, highlightRow) {
    const rowAction = () => {
      highlightRow(sectionId, rowId);
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
}

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  text: {
    flex: 1,
  },
});


export default connect(state => (state.requestItemsReducer),
  {
    getRequestItems: requestsActions.getRequestItems,
  }
)(RequestItemsList);
