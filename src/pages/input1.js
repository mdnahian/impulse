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

var Slider = require('../components/rn-slider');

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
				<Text allowFontScaling={false}  style={inputStyle.sliderLabel}>How long did the {this.props.app.state.settings[0].isImpulses ? 'impulse' : 'feeling' } last?</Text>

				<Slider
					min={2}
					max={30}
					value={10}
					label={'seconds'}
					onValueChange={(value) => this.props.app.setState({duration: value})}/>

			</View>

			<View style={inputStyle.stepsContainer}>
				<TouchableHighlight style={inputStyle.nextStepButton} onPress={this.nextStep} underlayColor={'#EEF3F8'}>
					<Text allowFontScaling={false}  style={inputStyle.nextStepText}>NEXT STEP</Text>
				</TouchableHighlight>

				<Text allowFontScaling={false}  style={inputStyle.remainingSteps}>STEP 1 OF 2</Text>
			</View>
		</View>
	},
	onValueChange: function (value) {

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