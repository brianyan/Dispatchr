import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import renderIf from '../lib/renderif'
import { Actions } from 'react-native-router-flux'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextField from 'react-native-md-textinput';
import Button from 'apsl-react-native-button';
import RequestListCell from '../components/RequestListCell';
import ListFilterButton from '../components/ListFilterButton';
import { firebaseApp } from '../../firebaseWrapper.js';
import { AsyncStorage } from 'react-native';

import {
  View,
  Text,
  ListView,
  TouchableHighlight,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  ScrollView
} from 'react-native';


class RequestsList extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      refreshing: false,
      dataSource: ds,
      showFetchButton: true,
      showNewRequestButton: true,
      selection: 'Global'
    };
    this.props.getRequests(this.state.selection);
  }

  componentWillMount () {
    Actions.refresh({
      rightTitle: "Profile",
      rightButtonTextStyle: {color: 'white'},
      onRight: this.props.showCurrentUserProfile
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.requests !== this.props.requests) {
      this.setState({
        refreshing: false,
        dataSource: this.state.dataSource.cloneWithRows(nextProps.requests),
        showFetchButton: nextProps.requests.length == 0
      })
    }
  }

  _leftSideSelected() {
    this.state.selection = 'Global';
    this.props.getRequests(this.state.selection);
  }

  _rightSideSelected() {
    this.state.selection = 'User';
    this.props.getRequests(this.state.selection);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ListFilterButton style={{flex: 1}} leftSideSelected={this._leftSideSelected.bind(this)} rightSideSelected={this._rightSideSelected.bind(this)}></ListFilterButton>
        {renderIf(this.state.showFetchButton)(
          <TouchableHighlight onPress = {() =>  {this.props.getRequests(this.state.selection)} }>
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
          onScroll={this._onScroll}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderSeparator={this._renderSeparator}
          renderFooter={this._renderFooter}
          enableEmptySections={true}
        />
        )}

        {this.state.showNewRequestButton ? <ActionButton buttonColor="#0288D1" onPress={() => Actions.NewRequestView() } /> : null}
    </View>
    );
  }

  //Keep track of the current scroll position
  _listViewOffset = 0;

  _onRefresh() {
   this.setState({refreshing: true});
   this.props.getRequests(this.state.selection);
  }

   _renderSeparator(sectionId, rowId) {
    return (
      <View key={rowId} style={styles.separator} />
    );
  }

  _onScroll = (event) => {
    // Simple fade-in / fade-out animation
    const CustomLayoutLinear = {
      duration: 100,
      create: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
      update: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
      delete: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity }
    }

    // Check if the user is scrolling up or down by confronting the new scroll position with your own one
    const currentOffset = event.nativeEvent.contentOffset.y

    const direction = (currentOffset > 0 && currentOffset > this._listViewOffset)
      ? 'down'
      : 'up'

    // If the user is scrolling down (and the action-button is still visible) hide it
    const showNewRequestButton = direction === 'up'

    if (showNewRequestButton !== this.state.showNewRequestButton) {
      LayoutAnimation.configureNext(CustomLayoutLinear)
      this.setState({ showNewRequestButton })
    }
    // Update scroll position
    this._listViewOffset = currentOffset
  }

 _renderRow(request, sectionId, rowId, highlightRow) {
   const rowAction = () => {
    highlightRow(sectionId, rowId);
     Actions.DetailedView({request});
   };
   return (
     <RequestListCell request={request} onSelect={rowAction}/>
   );
 }

 _renderSeparator(sectionId, rowId) {
   return (
     <View key={rowId} style={styles.separator} />
   );
 }

 _renderFooter(){
    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.button} onPress={() => console.log('load more')}>
          <Text style={styles.text}>Load More</Text>
        </TouchableOpacity>
      </View>
    );
 }
}

var styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  footerContainer: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  requestButtonSave: {
    borderColor: '#2980b9',
    backgroundColor: '#3498db',
    width: 100,
    height: 25
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
    requests: state.requests
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestsList);
