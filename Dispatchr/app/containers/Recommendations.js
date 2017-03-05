import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';

import React, { Component } from 'react';
import {StyleSheet, View, Text, ScrollView, Image} from 'react-native';

class Recommendations extends Component {
  constructor(){
    super();
    this.onRegionChange = this.onRegionChange.bind(this);
    this.state = {
      initialPosition: {"coords":{"speed":-1,"longitude":-119.85710799999998,"latitude":34.410192,"accuracy":5,"heading":-1,"altitude":0,"altitudeAccuracy":-1},"timestamp":1488685315346.43},
      lastPosition: {"coords":{"speed":-1,"longitude":-119.85710799999998,"latitude":34.410192,"accuracy":5,"heading":-1,"altitude":0,"altitudeAccuracy":-1},"timestamp":1488685315346.43},
      markers: [
        { // albertons 1
          latlng:{
            latitude:34.434227,
            longitude:-119.8513692,
          },
          title: "Albertons",
          description: "Store 1",
        },
        { // albertons 1
          latlng:{
            latitude:34.4310099,
            longitude: -119.8747144,
          },
          title: "Smart and Finals",
          description: "Store 2",
        },
        { // costco
          latlng:{
            latitude:34.4277881,
            longitude: -119.8747855,
          },
          title: "Smart and Finals",
          description: "Store 2",
        },
      ],
      currentLatLng: {
        latitude: 34.410192,
        longitude: -119.85710799999998,
      },
    // this.getInitialState = this.getInitialState.bind(this);
    }
  };

  watchID: ?number = null;

  // componentWillUpdate() {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       var initialPosition = JSON.stringify(position);
  //       console.log("hello tehre", initialPosition);
  //       if(initialPosition === null){
  //         console.log("fuck");
  //       }
  //       this.setState({initialPosition});
  //       // console.log("initial is" ,initialPosition.coords);
  //       // console.log("initial position is" ,initialPosition.coords);
  //     },
  //     (error) => alert(JSON.stringify(error)),
  //     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  //   );
  //   this.watchID = navigator.geolocation.watchPosition((position) => {
  //     var lastPosition = JSON.stringify(position);
  //     this.setState({lastPosition});
  //   });
  // }

  // componentWillUnmount() {
  //   navigator.geolocation.clearWatch(this.watchID);
  // }


  getInitialState() {
    return {
      region: {
        latitude: 34.4358,
        longitude: -119.8276,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
}

onRegionChange(region) {
  this.setState({ region });
}

render() {
  return (
      <View style={styles.container}>
        {console.log("hi" , this.state.initialPosition)}
        <MapView style ={styles.map}
          initialRegion={{
          latitude: this.state.initialPosition.coords.latitude,
          longitude: this.state.initialPosition.coords.longitude,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
          }}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          >
          <MapView.Marker
            coordinate={this.state.currentLatLng}
            title="Me"
            description="Sal"
          />
          {this.state.markers.map(marker => (
            <MapView.Marker
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
              image={require('../../img/heatmap.png')}
            />
          ))}
          </MapView>
          <ScrollView style={styles.scrollView}>
            <Image style = {styles.imgStyle} source= {require('../../img/sal1.png')}/>
            </ScrollView>
        </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollView: {

    top: 405,
    height: 200,
  },
  // imgStyle: {
  //   flex: 1,
  //   width: null,
  //   height: null,
  //   resizeMode: 'contain'
  // },
});

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    requests: state.requests
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recommendations);
