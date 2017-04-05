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
				<Text style={inputStyle.sliderLabel}>How strong is the impulse?</Text>

				<Slider
					max={10}
					bubbles={true}
					value={this.props.app.state.impulse}
					onValueChanged={(value) => this.sliderValueChanged(value)} />
					
				<Text style={[inputStyle.sliderLabel, {flex:1}]}>Did you succumb to it?</Text>
			
			</View>


			


			<View style={inputStyle.sliderContainer}>
				
				
				
				<TouchableHighlight style={[inputStyle.nextStepButton, {marginLeft:24, marginRight:24}]} onPress={this.noBtnPressed} underlayColor={'#EEF3F8'}>
					<Text style={inputStyle.nextStepText}>NO I DIDNT 💪</Text>
				</TouchableHighlight>

				<Text style={inputStyle.remainingSteps} onPress={this.yesBtnPressed}>YES I DID</Text>
				

			</View>

		</View>
	},
	closeImpulseButton: function () {
		this.props.somesound.stop();
		this.props.navigator.pop();
	},
	noBtnPressed: function () {
		this.props.somesound.stop();
		this.props.navigator.resetTo({
			name:'home'
		});
		this.props.onImpulseAdded(true);
	},
	yesBtnPressed: function () {
		this.props.somesound.stop();
		this.props.navigator.resetTo({
			name:'home'
		});
		this.props.onImpulseAdded(false);
	},
	sliderValueChanged: function (value) {
		this.props.app.setState({impulse: value});
		this.props.somesound.pause();
		this.props.somesound.setCurrentTime(0.5);
		this.props.somesound.setVolume(value / 20);
		this.props.somesound.play((success) => {
			if (success) {
			    console.log('successfully finished playing');
			} else {
				console.log('playback failed due to audio decoding errors');
		  	}
		});
	}
});