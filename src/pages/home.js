import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableHighlight
} from 'react-native';

import baseStyle from '../styles/baseStyle';
import homeStyle from '../styles/homeStyle';

module.exports = React.createClass({
	render: function() {
		return <View style={baseStyle.container}>
			<TouchableHighlight style={homeStyle.fullHistoryBtn} onPress={this.fullHistory} underlayColor={'#EEF3F8'}>
					<Text style={homeStyle.fullHistoryBtnText}>View Full History</Text>
			</TouchableHighlight>

			<View style={homeStyle.statsContainer}>
				<View style={homeStyle.statCircleOuter}>
					<View style={homeStyle.statCircleInner}>
						<Text style={homeStyle.statCircleNumber}>102</Text>
						<Text style={homeStyle.statCircleLabel} adjustsFontSizeToFit={true}>RESISTED</Text>
					</View>
				</View>

				<View style={homeStyle.statCircleOuter}>
					<View style={homeStyle.statCircleInner}>
						<Text style={homeStyle.statCircleNumber}>35</Text>
						<Text style={homeStyle.statCircleLabel} adjustsFontSizeToFit={true}>SUCCUMED</Text>
					</View>
				</View>				
			</View>

			<View style={homeStyle.loggedToday}>
				<Text style={homeStyle.loggedTodayNumber}>17</Text>
				<Text style={homeStyle.loggedTodayLabel}>Impulses Logged Today</Text>
			</View>

			<View style={homeStyle.loggedStats}>
				<Text style={homeStyle.loggedStatsText}><Text style={{fontWeight:'bold'}}>STREAK</Text>: 238</Text>
				<Text style={homeStyle.loggedStatsText}><Text style={{fontWeight:'bold'}}>BEST</Text>: 238</Text>
			</View>

			<View style={homeStyle.addButtonContainer}>
				<TouchableHighlight style={homeStyle.addButton} onPress={this.addImpulse} underlayColor={'#EEF3F8'}>
					<Image style={homeStyle.addButtonImage} source={require('../../img/add.png')}/>
				</TouchableHighlight>
			</View>
		</View>
	},
	fullHistory: function () {
		this.props.navigator.push({
			name: 'history',
		});

	},
	addImpulse: function () {
		this.props.navigator.push({
			name: 'input1',
		});
	}
});