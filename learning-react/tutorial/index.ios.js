// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */

import React, { Component } from 'react';
import { AppRegistry,StyleSheet, View, Text, Image } from 'react-native';

class FirstApp extends Component {
	render() {
		return (
			<View style = {styles.container}>
				<Text style = {styles.welcome}>
					Try this!
				</Text>
				<Image
					style = {styles.targetImage}
					source ={ require('./mind-blown.gif') }
				/>
			<View style={{flex: 1, flexDirection: 'row'}}>
				<Text style = {styles.instructions}>
					Im on the left
				</Text>
				<Text style = {styles.instructions}>
					Im on the right
				</Text>
				</View>
			</View>
		);
	}
}

// class Greeting extends Component {
// 	render() {
// 		const {name} = this.props; // creates local variable name that is set to this.props.name
// 		let imageURLS = {
// 			"Brian" : {uri: "https://capstone.cs.ucsb.edu/team_docs_17/pics/appfolio/2.jpg"},
// 			"Alok"  : {uri: "https://coderssb.com/home/_officers/Alok.jpg"},
// 			"Jordan" : {uri: "https://coderssb.com/home/_officers/Jordan.jpg"}
// 		};
// 		const urlToShow = imageURLS[name];
// 		return (
// 			<View style = {{alignItems: 'center'}}>
// 				<Text>Hello {this.props.name}!</Text>
// 				<Image source = {urlToShow}/>
// 				<Image source = {{uri: "https://capstone.cs.ucsb.edu/team_docs_17/pics/appfolio/2.jpg"}} style={{width: 193, height: 110}}/>
// 			</View>
// 			);
// 	}
// }
//
// class LotsOfGreetings extends Component {
// 	render() {
//
// 		return (
// 			<View style = {{alignItems: 'center'}}>
// 				<Greeting name = 'Alok' />
// 				<Greeting name = 'Jordan'/>
// 				<Greeting name = 'Brian'/>
// 			</View>
// 		);
// 	}
// }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
	left :{
		textAlign: "left",
	},
	right : {
		textAlign: "right",
	},
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 50,
  },
  instructions: {
    marginTop: 10,
    textAlign: 'center',
  },
  targetImage: {
    width: 150,
    height: 300,
    marginTop: 25,
  }
});

AppRegistry.registerComponent('tutorial', () => FirstApp);
