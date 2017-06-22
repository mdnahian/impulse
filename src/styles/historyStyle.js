import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';

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
		alignItems:'center',
		paddingTop:20
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
	},
	noData: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	placeholder: {
		width: Dimensions.get('window').width * 0.8,
		height: 250,
	},
	saveBtnContainer: {
		position:'absolute',
		zIndex:9999,
		top:0,
		right:0,
		bottom:0,
		backgroundColor:'#ffffff',
		padding:5,
		justifyContent:'center',
		alignItems:'center'
	},
	saveBtn: {
		width: 25,
		height: 25
	},
	popupDialog: {
		flex:1,
		justifyContent:'center'
	},
	inputGroup: {
		flex:1,
		flexDirection:'row',
		backgroundColor:'#dedede',
		padding:5,
		paddingLeft:10,
		paddingRight:10
	},
	archiveInput: {
		flex:4
	},
	archiveBtn: {
		flex: 2,
		justifyContent:'center',
		alignItems:'flex-end'
	},
	archiveText: {
		color: '#999999'
	},
	archiveTable: {
		flex:4
	},
	closeButton: {
		position: 'absolute',
		top:-24,
		right:-24,
		zIndex:9999,
		backgroundColor:'#ffffff',
		padding:12,
		borderRadius:100
	},
	closeButtonImage: {
		width:24,
		height:24
	}
});