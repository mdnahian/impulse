import React from 'react';
import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		backgroundColor: '#2F4861'
	},
	closeButtonContainer: {
		flex:1,
		justifyContent: 'center',
		alignItems: 'flex-end',
		marginLeft:24,
		marginRight:24
	},
	closeButton: {
		width:50,
		height:50,
		backgroundColor: '#E9EDF2',
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center'
	},
	closeButtonImage: {
		width:25,
		height:25
	},
	sliderContainer: {
		flex:1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	sliderLabel: {
		flex:1,
		fontSize:20,
		color: '#F5FAFF'
	},
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
		marginTop:-5,
		marginLeft:12,
		marginRight:12,
		backgroundColor: '#F5FAFF'
	},
	sliderPoint: {
		width:8,
		height:8,
		borderRadius:4,
		marginLeft:10,
		marginRight:10,
		backgroundColor: '#F5FAFF'
	},
	stepsContainer: {
		flex:1,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft:24,
		marginRight:24
	},
	nextStepButton: {
		flex:1,
		alignSelf: 'stretch',
		backgroundColor: '#E9EDF2',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 6
	},
	nextStepText: {
		fontSize:15,
		fontWeight: 'bold',
		color: '#2F4861'
	},
	remainingSteps: {
		flex:2,
		fontSize:15,
		fontWeight:'bold',
		color: '#E9EDF2',
		marginTop:24
	}
});