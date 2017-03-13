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
		flex:4
	},
	chartCircles: {
		flex:1
	}
});