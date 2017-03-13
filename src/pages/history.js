import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableHighlight
} from 'react-native';

import baseStyle from '../styles/baseStyle';
import historyStyle from '../styles/historyStyle';

module.exports = React.createClass({
	render: function() {
		return <View style={baseStyle.container}>
			<View style={historyStyle.tabsContainer}>
				<TouchableHighlight style={[historyStyle.tab, historyStyle.tabActive]}>
					<Text style={[historyStyle.tabText, historyStyle.tabTextActive]}>FREQUENCY</Text>
				</TouchableHighlight>

				<TouchableHighlight style={historyStyle.tab}>
					<Text style={historyStyle.tabText}>INTENSITY</Text>
				</TouchableHighlight>
			</View>

			<View style={historyStyle.chartContainer}>
				<View style={historyStyle.chart}>

				</View>

				<View style={historyStyle.chartCircles}>
					
				</View>
			</View>
		</View>
	}
});