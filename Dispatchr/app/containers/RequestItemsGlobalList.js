import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import renderIf from '../lib/renderif'
import { Actions } from 'react-native-router-flux'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import TextField from 'react-native-md-textinput';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';

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

class RequestItemsGlobalList extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      refreshing: false,
      dataSource: ds,
      showFetchButton: true,
      showActionButton: true
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
          onScroll={this._onScroll}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderSeparator={this._renderSeparator}
          renderFooter={this._renderFooter}
          enableEmptySections={true}
        />
        )}

        <PopupDialog
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          dialogAnimation = { new SlideAnimation({ slideFrom: 'bottom' }) }
          dialogTitle={<DialogTitle title="New Request" />}
          width={340}
          height={450}
          overlayOpacity={0.75}
        >
          <View>
            <ScrollView>
              <TextField label={'Name'} highlightColor={'#00BCD4'} />
              <TextField
                label={'Qty.'}
                highlightColor={'#00BCD4'}
                keyboardType={'numeric'}
              />
            </ScrollView>
          </View>
        </PopupDialog>

        {renderIf(this.state.showActionButton)(
        <ActionButton buttonColor="#0288D1">
          <ActionButton.Item title="New Request" onPress={() => this.popupDialog.openDialog()}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
        )}
    </View>
    );
  }

  //Keep track of the current scroll position
  _listViewOffset = 0;

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
             {rowData.name}
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
  const showActionButton = direction === 'up'

  if (showActionButton !== this.state.showActionButton) {
    LayoutAnimation.configureNext(CustomLayoutLinear)
    this.setState({ showActionButton })
  }
  // Update scroll position
  this._listViewOffset = currentOffset
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
