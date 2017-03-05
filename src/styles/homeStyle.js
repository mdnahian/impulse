import React from 'react';
import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
	fullHistoryBtn: {
		flex: 0.8,
		backgroundColor: '#EEF3F8',
		justifyContent: 'center',
		alignItems: 'center'
	},
	fullHistoryBtnText: {
		textAlign: 'center',
		color: '#2F4861',
		fontWeight: 'bold',
		fontSize: 18
	},
	statsContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding:12
	},
	statCircleOuter: {
		flex: 1,
		// backgroundColor: '#E9EDF2',
		justifyContent: 'center',
		alignItems: 'center'
	},
	statCircleInner: {
		width:80,
		height:80,
		borderRadius:40,
		backgroundColor: '#E9EDF2',
		justifyContent: 'center',
		alignItems: 'center'
	},
	statCircleNumber: {
		color: '#2F4861',
		fontWeight: 'bold',
		fontSize: 20
	},
	statCircleLabel: {
		color: '#2F4861',
		fontSize: 8,
		textAlign: 'center'
	},
	loggedToday: {
		flex:2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	loggedTodayNumber: {
		color: '#2F4861',
		fontWeight: 'bold',
		fontSize: 128,
		textAlign: 'center'
	},
	loggedTodayLabel: {
		color: '#707B96',
		fontSize: 24,
		textAlign: 'center'
	},
	loggedStats: {
		flex:1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	loggedStatsText: {
		flex:1,
		textAlign: 'center',
		fontSize: 12,
		color: '#2F4861'
	},
	addButtonContainer: {
		flex:1,
		justifyContent: 'center',
		alignItems: 'center',
		padding:12
	},
	addButton: {
		width:64,
		height:64,
		backgroundColor: '#E9EDF2',
		borderRadius: 32,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom:64
	},
	addButtonImage: {
		width:32,
		height:32
	}
});