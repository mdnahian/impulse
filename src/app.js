import React, { Component } from 'react';
import { Navigator } from 'react-native';

import Store from 'react-native-store';

var Sound = require('react-native-sound');

var Home = require('./pages/home');
var History = require('./pages/history');
var Input1 = require('./pages/input1');
var Input2 = require('./pages/input2');

var ROUTES = {
	home: Home,
	history: History,
	input1: Input1,
	input2: Input2,
	archives: null
};


const DB = {
    'impulses': Store.model('impulses'),
    'archives': Store.model('archives')
}


var somesound = new Sound('sound.mp3', Sound.MAIN_BUNDLE, (error) => {
	  if (error) {
	    console.log('failed to load the sound', error);
	    return;
	  } 
	  // loaded successfully
	  console.log('duration in seconds: ' + somesound.getDuration() + 'number of channels: ' + somesound.getNumberOfChannels());
});


module.exports = React.createClass({
	componentDidMount: function () {
		this.getImpulses();
		this.getArchieves();
	},
	getInitialState: function() {
		return {
			impulse: 5,
			duration: 15,
			showDialog: false,
			isLoading: false
		}
	},
	renderScene: function(route, navigator) {
		var Component = ROUTES[route.name];
		return <Component route={route} navigator={navigator} app={this} somesound={somesound} onImpulseAdded={(succumbed) => this.onImpulseAdded(succumbed)} />
	},
	render: function() {
		return <Navigator style={{flex:1}}
		initialRoute={{name: 'home'}}
		renderScene={this.renderScene}
		configureScene={(route) => { 
			if(route.name == 'history') {
				return Navigator.SceneConfigs.FloatFromBottom
			} else {
				return Navigator.SceneConfigs.FloatFromRight
			}
		}} />
	},
	getImpulses: function() {
		DB.impulses.find().then(resp => this.setState({
			impulses: resp,
			isLoading: false
		}));
	},
	getArchieves: function() {
		DB.archives.find().then(resp => this.setState({
			archives: resp
		}));
	},
	onImpulseAdded: function(succumbed) {
		DB.impulses.add({
	        impulse: this.state.impulse,
	        duration: this.state.duration,
	        succumbed: succumbed,
	        datetime: new Date()
    	}).then((token) => {
    		this.setState({
    			impulse: 5,
	    		duration: 10,
	    		isLoading: false,
	    		showDialog: true,
	    		succumbed: succumbed
    		});

    		this.getImpulses();
    	});

    	this.setState({
    		isLoading: true
    	});
	}
});