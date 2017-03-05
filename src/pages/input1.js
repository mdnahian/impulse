import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableHighlight
} from 'react-native';

import baseStyle from '../styles/baseStyle';
import inputStyle from '../styles/inputStyle';

var Slider = require('../components/react-native-slider');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			impulse: 0
		}
	},
	render: function() {
		return <View style={[baseStyle.container, inputStyle.container]}>
			<View style={inputStyle.closeButtonContainer}>
				<TouchableHighlight style={inputStyle.closeButton} onPress={this.closeImpulseButton} underlayColor={'#EEF3F8'}>
					<Image style={inputStyle.closeButtonImage} source={require('../../img/close.png')}/>
				</TouchableHighlight>
			</View>

			<View style={inputStyle.sliderContainer}>
				<Text style={inputStyle.sliderLabel}>How strong is the impulse?</Text>

				<Slider
					max={10}
					value={5} />
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
		this.props.navigator.pop();
	}
});