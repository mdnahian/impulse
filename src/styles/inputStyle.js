import React from 'react';
import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		backgroundColor: '#2F4861',
		marginTop: 0
	},
	closeButtonContainer: {
		flex:0.5,
		justifyContent: 'center',
		alignItems: 'flex-end',
		marginLeft:24,
		marginRight:24,
		marginBottom:64
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
		flex:2,
		fontSize:20,
		color: '#F5FAFF'
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
		flex:3,
		fontSize:15,
		fontWeight:'bold',
		color: '#E9EDF2',
		marginTop:24
	}
});