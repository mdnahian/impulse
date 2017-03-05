import React, { Component } from 'react';
import { Navigator } from 'react-native';

var Home = require('./pages/home');
// var History = require('./pages/history');
var Input1 = require('./pages/input1');
// var Input2 = require('./pages/input2');

var ROUTES = {
	home: Home,
	// history: History,
	input1: Input1,
	// input2: Input2
};

module.exports = React.createClass({
	renderScene: function(route, navigator) {
		var Component = ROUTES[route.name];
		return <Component route={route} navigator={navigator} />
	},
	render: function() {
		return <Navigator style={{flex:1}}
		initialRoute={{name: 'home'}}
		renderScene={this.renderScene}
		configScene={() => { return Navigator.SceneConfigs.FloatFromRight; }} />
	}
});