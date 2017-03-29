import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableHighlight
} from 'react-native';

import baseStyle from '../styles/baseStyle';
import homeStyle from '../styles/homeStyle';
import PopupDialog from 'react-native-popup-dialog';


module.exports = React.createClass({
	render: function() {

		if(this.props.app.state.isLoading){
			return <View><Text>Loading...</Text></View>;
		}

		var impulses = this.props.app.state.impulses;

		var impulses_today = 0;
		var impulses_resisted = 0;
		var impulses_succumbed = 0;

		if(impulses != null){
			for(var i=0; i<impulses.length; i++){
				if(new Date(impulses[i].datetime).setHours(0,0,0,0) == new Date().setHours(0,0,0,0)){
					impulses_today++;
				}

				if(!impulses[i].succumbed){
					impulses_succumbed++;
				} else {
					impulses_resisted++;
				}

				// get streak & best values

			}
		}


		return <View style={baseStyle.container}>

			<TouchableHighlight style={homeStyle.fullHistoryBtn} onPress={this.fullHistory} underlayColor={'#EEF3F8'}>
					<Text style={homeStyle.fullHistoryBtnText}>View Full History</Text>
			</TouchableHighlight>

			<View style={homeStyle.statsContainer}>
				<View style={homeStyle.statCircleOuter}>
					<View style={homeStyle.statCircleInner}>
						<Text style={homeStyle.statCircleNumber}>{impulses_resisted}</Text>
						<Text style={homeStyle.statCircleLabel} adjustsFontSizeToFit={true}>RESISTED</Text>
					</View>
				</View>

				<View style={homeStyle.statCircleOuter}>
					<View style={homeStyle.statCircleInner}>
						<Text style={homeStyle.statCircleNumber}>{impulses_succumbed}</Text>
						<Text style={homeStyle.statCircleLabel} adjustsFontSizeToFit={true}>SUCCUMBED</Text>
					</View>
				</View>				
			</View>

			<View style={homeStyle.loggedToday}>
				<Text style={homeStyle.loggedTodayNumber}>{impulses_today}</Text>
				<Text style={homeStyle.loggedTodayLabel}>Impulses Logged Today</Text>
			</View>

			<View style={homeStyle.loggedStats}>
				<Text style={homeStyle.loggedStatsText}><Text style={{fontWeight:'bold'}}>STREAK</Text>: 0</Text>
				<Text style={homeStyle.loggedStatsText}><Text style={{fontWeight:'bold'}}>BEST</Text>: 0</Text>
			</View>

			<View style={homeStyle.addButtonContainer}>
				<TouchableHighlight style={homeStyle.addButton} onPress={this.addImpulse} underlayColor={'#EEF3F8'}>
					<Image style={homeStyle.addButtonImage} source={require('../../img/add.png')}/>
				</TouchableHighlight>
			</View>


			<PopupDialog
				height={0.3}
				width={0.75}
				show={this.props.app.state.showDialog}
			    ref={(popupDialog) => { this.popupDialog = popupDialog }}>
			    <View style={baseStyle.dialogContainer}>
			    	<View style={baseStyle.dialogEmoji}>
			    		<Text style={baseStyle.dialogEmojiText}>👍</Text>
			    	</View>
			    	<View style={baseStyle.dialogText}>
				      <Text style={baseStyle.dialogTitle}>Great!</Text>
				      <Text style={baseStyle.dialogSubTitle}>JOB DONE</Text>
				    </View>
				</View>
			</PopupDialog>

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