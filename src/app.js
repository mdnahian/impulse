import React, { Component } from 'react';
import { Navigator } from 'react-native';

var Sound = require('react-native-sound');

var Home = require('./pages/home');
var History = require('./pages/history');
var Input1 = require('./pages/input1');
var Input2 = require('./pages/input2');

var ROUTES = {
	home: Home,
	history: History,
	input1: Input1,
	input2: Input2
};


var somesound = new Sound('/Volumes/STORAGE/Javascript\ Projects/impulse/sounds/default.mp3', '', (error) => {
	  if (error) {
	    console.log('failed to load the sound', error);
	    return;
	  } 
	  // loaded successfully
	  console.log('duration in seconds: ' + somesound.getDuration() + 'number of channels: ' + somesound.getNumberOfChannels());
});


module.exports = React.createClass({
	getInitialState: function() {
		return {
			impulse: 5,
			duration: 10
		}
	},
	renderScene: function(route, navigator) {
		var Component = ROUTES[route.name];
		return <Component route={route} navigator={navigator} app={this} somesound={somesound} />
	},
	render: function() {
		return <Navigator style={{flex:1}}
		initialRoute={{name: 'home'}}
		renderScene={this.renderScene}
		configScene={() => { return Navigator.SceneConfigs.FloatFromRight; }} />
	}
});