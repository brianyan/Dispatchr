// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */

import React, { Component } from 'react';
import { AppRegistry,View, Text, Image } from 'react-native';

class Greeting extends Component {
	render() {
		const {name} = this.props; // creates local variable name that is set to this.props.name
		const imageURLS = {
			"Brian" : "https://coderssb.com/home/_officers/Brian.jpg",
			"Alok"  : "https://coderssb.com/home/_officers/Alok.jpg",
			"Jordan" : "https://coderssb.com/home/_officers/Jordan.jpg"
		};
		const urlToShow = imageURLS[name];
		return (

			<View style = {{alignItems: 'center'}}>
				<Text>Hello {this.props.name}!</Text>
				<Text>Hello {urlToShow}!</Text>
				<Image source = {{uri : 'https://coderssb.com/home/_officers/Jordan.jpg' }} />
				<Image source= {urlToShow}/>
			</View>
			);
	}
}

class LotsOfGreetings extends Component {
	render() {

		return (
			<View style = {{alignItems: 'center'}}>
				<Greeting name = 'Alok' />
				<Greeting name = 'Jordan'/>
				<Greeting name = 'Brian'/>
			</View>
		);
	}
}

AppRegistry.registerComponent('tutorial', () => LotsOfGreetings);
