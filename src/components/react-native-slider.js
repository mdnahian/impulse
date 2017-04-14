import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
	PanResponder,
    Animated,
    Dimensions
} from 'react-native';


module.exports = React.createClass({
	componentWillMount: function () {

		this.state.pan.x.addListener((value) => {

			if(this.props.bubbles){

				if(this.state.isPlaying == false){
					this.props.somesound.setNumberOfLoops(-1);
					this.props.somesound.setVolume(0.05);
					this.props.somesound.setCurrentTime(0.5);
					// this.props.somesound.setVolume(value / 20);
					this.props.somesound.play((success) => {
						if (success) {
						    console.log('successfully finished playing');
						} else {
							console.log('playback failed due to audio decoding errors');
					  	}
					});

					this.setState({
						isPlaying: true
					})
				}

				// if(value.value % 27 == 0){
				// 	var val = value.value/27;
				// 	if(val > 0 && val < 11){
				// 		this.setState({
				// 			val: val
				// 		});
				// 	}
						
				// }

				var val = Math.round(value.value/27);
				if(val >= 1 && val <= 10){
					this.setState({
						val:val
					});
					this.props.somesound.setVolume(val / 20);
				}

			} else {
				var val = Math.round(value.value/4.66);
				if(val >= 2 && val <= 45){
					this.setState({
						val: val
					})
				} 

			}
			

			// console.log(value.value);
		});

		this.panResponder = PanResponder.create({    
	        onStartShouldSetPanResponder : () => true,
	        onPanResponderMove           : Animated.event([null,{ 
		            dx : this.state.pan.x,
		            dy : this.state.pan.y
	        }]),
			// onPanResponderMove           : (e, gesture) => {
			// 	if(gesture.dx > 0){
	  //       		this.moveRight();
	  //       	} else {
	  //       		this.moveLeft();
	  //       	}
			// },
	        onPanResponderRelease        : (e, gesture) => {
	        	this.props.onValueChanged(this.state.val);

	        	if(this.props.bubbles){
	        		this.props.somesound.pause();
		        	this.setState({
		        		isPlaying: false
		        	})
	        	}
	        	
	        }
	    });
	},
	componentWillUnmount: function() {
	    this.state.pan.x.removeAllListeners();
	},  
	getInitialState: function () {
		return {
			value: this.props.value,
			pan:  new Animated.ValueXY(),
			val: this.props.value,
			isPlaying: false
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

						// return <View key={i + 1} style={style.sliderPointCurrentContainer}>
						// 	<View style={style.sliderPointCurrentLabel}><Text style={style.sliderPointCurrentNumber}>{i + 1}{label}</Text></View>
						// 	<View style={style.sliderPointCurrentLine}></View>
						// 	<View style={[style.sliderPoint, style.sliderPointCurrent]}></View> 
						// </View>

						return <Animated.View key={i + 1} {...this.panResponder.panHandlers}  style={[this.state.pan.getLayout(), style.sliderPointCurrentContainer]}>
							<View style={style.sliderPointCurrentLabel}><Text style={style.sliderPointCurrentNumber}>{this.state.val}{label}</Text></View>
							<View style={style.sliderPointCurrentLine}></View>
							<View style={[style.sliderPoint, style.sliderPointCurrent]}></View> 
						</Animated.View>
					}

					// if(this.props.bubbles){
					// 	return <TouchableHighlight key={i + 1} onPress={() => this.moveToPos(i + 1)} underlayColor={'transparent'}>
					// 		<View style={style.sliderPoint}></View>
					// 	</TouchableHighlight>
					// } else {
					// 	return <TouchableHighlight key={i + 1} onPress={() => this.moveToPos(i + 1)} underlayColor={'transparent'}>
					// 		<View style={style.sliderPointFalse}></View>
					// 	</TouchableHighlight>
					// }


					// if(this.props.bubbles){
					// 	return <View key={i + 1}>
					// 		<View style={style.sliderPoint}></View>
					// 	</View>
					// } else {
						return <View key={i + 1}>
							<View style={style.sliderPointFalse}></View>
						</View>
					// }

					
				})}
			</View>

			<View style={style.sliderLine}></View>
		</View>
	},
	moveLeft: function () {
		this.setState({
			value: this.state.value + 1
		});
	},
	moveRight: function () {
		this.setState({
			value: this.state.value - 1
		})
	},
	moveToPos: function (pos) {
		this.setState({
			value: pos
		});
		this.props.onValueChanged(pos);
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
		left:0,
		right:0,
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