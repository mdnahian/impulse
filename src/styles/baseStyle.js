import React from 'react';
import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		marginTop: (Platform.OS === 'ios') ? 20 : 0,
		backgroundColor: '#F5FAFF'
	},
	dialogContainer: {
		flex:1,
		flexDirection: 'row',
		backgroundColor:'#ffffff',
		alignItems: 'center',
    	justifyContent: 'center',
	},
	dialogEmoji: {
		flex:1,
		alignItems: 'flex-end',
    	justifyContent: 'center',
	},
	dialogEmojiText: {
		fontSize:72,
		alignItems: 'flex-end',
    	justifyContent: 'center',
	},
	dialogText: {
		flex:1.5,
		alignItems: 'center',
    	justifyContent: 'center'
	},
	dialogTitle: {
		color: '#2F4861',
		fontWeight: 'bold',
		fontSize: 32,
		alignItems: 'center',
    	justifyContent: 'center'
	},
	dialogSubtitle: {
		color: '#2F4861',
		fontSize: 24,
		alignItems: 'center',
    	justifyContent: 'center'
	}
});