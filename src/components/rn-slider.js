import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
    Dimensions,
    Slider
} from 'react-native';



module.exports = React.createClass({
	componentDidMount: function () {
		
	},
	getInitialState: function () {
		return {
			value: this.props.value,
			left: -1000,
			width:0,
			isPlaying: false
		}
	},
	render: function () {

		var label = '';

		if(this.props.label != null){
			label = ' '+this.props.label;
		}

		return <View style={style.slider}>
			<View style={[style.sliderPointCurrentContainer, {left:this.state.left}]}>
				<View style={style.sliderPointCurrentLabel}><Text style={style.sliderPointCurrentNumber}>{this.state.value}{label}</Text></View>
				<View style={style.sliderPointCurrentLine}></View>
			</View>

			<Slider
				minimumValue={this.props.min}
				maximumValue={this.props.max}
				step={1}
				value={this.state.value}
				minimumTrackTintColor={'white'}
				maximumTrackTintColor={'white'}
				style={
					{
						flex:1,
						position:'absolute', 
						left:35, 
						right:35
					}
				}
				onLayout={(event) => this.setState({width: event.nativeEvent.layout.width})}
				onValueChange={(value) => this.onValueChange(value)}/>
		</View>
	},
	onValueChange: function (value) {
		var sub = this.props.max;
		if(this.props.label == null){
			sub -= 9  ;
		}
		var l = Math.round((value / this.props.max) * this.state.width) - sub;
		console.log(l);
		this.setState({
			left: l,
			value: value
		});
		this.props.onValueChange(value);
	}
});


var style = StyleSheet.create({
	slider: {
		flex:2,
		width: Dimensions.get('window').width
	},
	sliderPoints: {
		flexDirection: 'row'
	},
	sliderLine: {
		alignSelf: 'stretch',
		height:2,
		position: 'absolute',
		top:3,
		left:45,
		right:45,
		backgroundColor: '#F5FAFF'
	},
	sliderPoint: {
		width:8,
		height:8,
		borderRadius:4,
		marginLeft: 10,
		marginRight: 10,
		backgroundColor: '#F5FAFF'
	},
	sliderPointFalse: {
		width:8,
		height:8,
		marginLeft:0,
		marginRight:0,
		opacity:0,
		backgroundColor: '#F5FAFF'
	},
	sliderPointCurrentContainer: {
		position: 'absolute',
		top:-40,
		justifyContent: 'center',
		alignItems: 'center'
	},
	sliderPointCurrentLabel: {
		backgroundColor: '#F5FAFF',
		paddingLeft:16,
		paddingRight:16,
		padding:5,
		borderRadius:16
	},
	sliderPointCurrentLine: {
		height:32,
		width:6,
		backgroundColor: '#F5FAFF',
	},
	sliderPointCurrentNumber: {
		textAlign: 'center',
		fontSize:15,
		color: '#2F4861'
	},
	sliderPointCurrent: {
		width: 24,
		height:24,
		borderRadius: 12
	}
});