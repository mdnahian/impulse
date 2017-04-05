import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableHighlight,
	StatusBar
} from 'react-native';

import baseStyle from '../styles/baseStyle';
import inputStyle from '../styles/inputStyle';

var Slider = require('../components/react-native-slider');

module.exports = React.createClass({
	render: function() {
		return <View style={[baseStyle.container, inputStyle.container]}>
			<StatusBar hidden />
			<View style={inputStyle.closeButtonContainer}>
				<TouchableHighlight style={inputStyle.closeButton} onPress={this.closeImpulseButton} underlayColor={'#EEF3F8'}>
					<Image style={inputStyle.closeButtonImage} source={require('../../img/close.png')}/>
				</TouchableHighlight>
			</View>

			<View style={inputStyle.sliderContainer}>
				<Text style={inputStyle.sliderLabel}>How long did the impulse last?</Text>

				<Slider
					max={30}
					bubbles={false}
					label={"seconds"}
					value={this.props.app.state.duration}
					onValueChanged={(value) => this.sliderValueChanged(value)} />

			</View>

			<View style={inputStyle.stepsContainer}>
				<TouchableHighlight style={inputStyle.nextStepButton} onPress={this.nextStep} underlayColor={'#EEF3F8'}>
					<Text style={inputStyle.nextStepText}>NEXT STEP</Text>
				</TouchableHighlight>

				<Text style={inputStyle.remainingSteps}>STEP 1 OF 2</Text>
			</View>
		</View>
	},
	closeImpulseButton: function () {
		this.props.somesound.stop();
		this.props.navigator.pop();
	},
	nextStep: function () {
		this.props.navigator.push({
			name: 'input2'
		})
	},
	sliderValueChanged: function (value) {
		this.props.app.setState({duration: value});
	}
});