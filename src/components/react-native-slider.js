import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
	PanResponder
} from 'react-native';


module.exports = React.createClass({
	getInitialState: function () {
		return {
			value: this.props.value
		}
	},
	render: function () {
		return <View style={style.slider}>
			<View style={style.sliderPoints}>
				{Array.apply(0, Array(this.props.max)).map((x, i) =>  {

					if(i == this.state.value - 1){

						var label = '';

						if(this.props.label != null){
							label = ' '+this.props.label;
						}

						return <View key={i + 1} style={style.sliderPointCurrentContainer}>
							<View style={style.sliderPointCurrentLabel}><Text style={style.sliderPointCurrentNumber}>{i + 1}{label}</Text></View>
							<View style={style.sliderPointCurrentLine}></View>
							<View style={[style.sliderPoint, style.sliderPointCurrent]}></View> 
						</View>
					}

					if(this.props.bubbles){
						return <TouchableHighlight key={i + 1} onPress={() => this.moveToPos(i + 1)} underlayColor={'transparent'}>
							<View style={style.sliderPoint}></View>
						</TouchableHighlight>
					} else {
						return <TouchableHighlight key={i + 1} onPress={() => this.moveToPos(i + 1)} underlayColor={'transparent'}>
							<View style={style.sliderPointFalse}></View>
						</TouchableHighlight>
					}

					
				})}
			</View>

			<View style={style.sliderLine}></View>
		</View>
	},
	moveLeft: function () {
		this.setState({
			value: value + 1
		})
	},
	moveRight: function () {
		this.setState({
			value: value - 1
		})
	},
	moveToPos: function (pos) {
		console.log(pos);
		this.setState({
			value: pos
		})
	}
});


var style = StyleSheet.create({
	slider: {
		flex:2,
		marginLeft:24,
		marginRight:24
	},
	sliderPoints: {
		flexDirection: 'row'
	},
	sliderLine: {
		alignSelf: 'stretch',
		height:2,
		position: 'absolute',
		top:3,
		left:0,
		right:0,
		marginLeft:12,
		marginRight:12,
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
		position: 'relative',
		top:-48,
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
		height:12,
		width:4,
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