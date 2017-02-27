import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import NotificationCell from '../components/NotificationCell';
import {
  View,
  Text,
  ListView,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  ScrollView
} from 'react-native';

class NotificationsList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      refreshing: false,
      dataSource: ds
    };
    this.props.getNotifications();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.notifications !== this.props.notifications) {
      this.setState({
        refreshing: false,
        dataSource: this.state.dataSource.cloneWithRows(nextProps.notifications)
      })
    }
  }

  _onRefresh() {
   this.setState({refreshing: true});
   this.props.getNotifications();
  }

  _renderSeparator(sectionId, rowId) {
   return (
     <View key={rowId} style={styles.separator} />
   );
 }

 _renderRow(notification, sectionId, rowId, highlightRow) {
   const rowAction = () => {
    highlightRow(sectionId, rowId);
   };

   return (
     <NotificationCell notification={notification} onSelect={rowAction}/>
   );
 }

  render() {
    return (
      <ListView style={{flex:1}}
        refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        renderSeparator={this._renderSeparator}
        enableEmptySections={true}
      />
    );
  }


}

var styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  }
});

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    notifications: state.notifications
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsList);
