import React from 'react';
import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		marginTop: (Platform.OS === 'ios') ? 20 : 0,
		backgroundColor: '#F5FAFF'
	}
});