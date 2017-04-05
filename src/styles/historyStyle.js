import React from 'react';
import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
	tabsContainer: {
		flex:1,
		flexDirection: 'row',
		backgroundColor:'#EEF3F8',
		justifyContent:'center',
		alignItems:'center'
	},
	chartContainer: {
		flex:6
	},
	tab: {
		padding:10,
		backgroundColor:'#ffffff'
	},
	tabText: {
		fontSize:10,
		fontWeight:'bold'
	},
	tabActive: {
		backgroundColor:'#2F4861'
	},
	tabTextActive: {
		color:'#ffffff'
	},
	chart: {
		flex:4,
		justifyContent: 'center',
		alignItems:'center'
	},
	chartCircles: {
		flex:2,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding:12
	},
	statCircleOuter: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	statCircleInner: {
		width:92,
		height:92,
		borderRadius:46,
		backgroundColor: '#E9EDF2',
		justifyContent: 'center',
		alignItems: 'center'
	},
	statCircleLabel: {
		color: '#2F4861',
		fontSize: 8,
		textAlign: 'center'
	},
	statCircleNumber: {
		color: '#2F4861',
		fontSize: 18,
		textAlign: 'center'
	},
	closeBtn: {
		flex:0.5,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'#E9EDF2'
	},
	closeBtnImage: {
		width:24,
		height:24
	}
});