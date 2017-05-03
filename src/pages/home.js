import React, { Component } from 'react';
import {
	Alert,
	View,
	Text,
	Image,
	TouchableHighlight
} from 'react-native';

import { Navigator } from 'react-native';

import baseStyle from '../styles/baseStyle';
import homeStyle from '../styles/homeStyle';
import PopupDialog from 'react-native-popup-dialog';

import SilentSwitch from 'react-native-silent-switch';
import StatusBarAlert from 'react-native-statusbar-alert';



module.exports = React.createClass({
	getInitialState: function () {
		return {
			alerts: false
		}
	},
	componentWillMount: function () {
		try{
			SilentSwitch.removeEventListener();
		} catch (err){

		}
	},
	componentDidMount: function () {
		SilentSwitch.addEventListener(silent => {
	    if (silent) {
	      this.setState({
	        alerts: [{
	          message: 'Please turn silent switch off'
	        }, ...this.state.alerts]
	      })
	    } else {
	      this.setState({
	        alerts: false
	      })
	    }
	  })
	},
	render: function() {

		if(this.props.app.state.isLoading){
			return <View><Text allowFontScaling={false} >Loading...</Text></View>;
		}

		console.log(this.props.app.state.archives);



		var impulses = this.props.app.state.impulses;

		var impulses_today = 0;
		var impulses_resisted = 0;
		var impulses_succumbed = 0;

		var impulses_resisted_until_succumbed = 0;
		var impulses_resisted_best_score = 0;

		if(impulses != null){
			for(var i=0; i<impulses.length; i++){
				if(new Date(impulses[i].datetime).setHours(0,0,0,0) == new Date().setHours(0,0,0,0)){
					impulses_today++;
				}

				if(!impulses[i].succumbed){
					impulses_succumbed++;
					impulses_resisted_until_succumbed = 0;
				} else {
					impulses_resisted++;
					impulses_resisted_until_succumbed++;
				}

				// get streak & best values

				if(impulses_resisted_best_score < impulses_resisted_until_succumbed){
					impulses_resisted_best_score = impulses_resisted_until_succumbed;
				}

			}
		}


		var silent;

		if(this.state.alerts != false){
			silent = <StatusBarAlert
		        visible={this.state.alerts.length > 0}
		        backgroundColor='#FA6161'
		        pulse="background"
		        {...this.state.alerts[0]}/>
		}

		var inner = <View style={baseStyle.dialogText}>
	      <Text allowFontScaling={false}  style={baseStyle.dialogTitle}>Great!</Text>
	      <Text allowFontScaling={false}  style={baseStyle.dialogSubTitle}>JOB DONE</Text>
	    </View>

	    if(!this.props.app.state.succumbed){
	    	inner = <View style={baseStyle.dialogText}>
		      <Text allowFontScaling={false}  style={[baseStyle.dialogTitle, {fontSize:15}]}>Keep Trying</Text>
		      <Text allowFontScaling={false}  style={baseStyle.dialogSubTitle}>JOB DONE</Text>
		    </View>
	    }




		return <View style={baseStyle.container}>

			{silent}

			<TouchableHighlight style={homeStyle.fullHistoryBtn} onPress={this.fullHistory} underlayColor={'#EEF3F8'}>
					<Text allowFontScaling={false}  style={homeStyle.fullHistoryBtnText}>View Full History</Text>
			</TouchableHighlight>

			<View style={homeStyle.statsContainer}>
				<View style={homeStyle.statCircleOuter}>
					<View style={homeStyle.statCircleInner}>
						<Text allowFontScaling={false}  style={homeStyle.statCircleNumber}>{impulses_resisted}</Text>
						<Text allowFontScaling={false}  style={homeStyle.statCircleLabel} adjustsFontSizeToFit={true}>RESISTED</Text>
					</View>
				</View>

				<View style={homeStyle.statCircleOuter}>
					<View style={homeStyle.statCircleInner}>
						<Text allowFontScaling={false}  style={homeStyle.statCircleNumber}>{impulses_succumbed}</Text>
						<Text allowFontScaling={false}  style={homeStyle.statCircleLabel} adjustsFontSizeToFit={true}>SUCCUMBED</Text>
					</View>
				</View>				
			</View>

			<View style={homeStyle.loggedToday}>
				<Text allowFontScaling={false}  style={homeStyle.loggedTodayNumber}>{impulses_today}</Text>
				<Text allowFontScaling={false}  style={homeStyle.loggedTodayLabel}>Impulses Logged Today</Text>
			</View>

			<View style={homeStyle.loggedStats}>
				<Text allowFontScaling={false}  style={homeStyle.loggedStatsText}><Text allowFontScaling={false}  style={{fontWeight:'bold'}}>STREAK</Text>: {impulses_resisted_until_succumbed}</Text>
				<Text allowFontScaling={false}  style={homeStyle.loggedStatsText}><Text allowFontScaling={false}  style={{fontWeight:'bold'}}>BEST</Text>: {impulses_resisted_best_score}</Text>
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
			    	<TouchableHighlight style={homeStyle.closeButton} onPress={this.dismissPopup} underlayColor={'transparent'}>
						<Image style={homeStyle.closeButtonImage} source={require('../../img/closeGray.png')}/>
					</TouchableHighlight>

			    	<View style={baseStyle.dialogEmoji}>
			    		<Text allowFontScaling={false}  style={baseStyle.dialogEmojiText}>👍</Text>
			    	</View>
			    	{inner}
				</View>
			</PopupDialog>

		</View>
	},
	dismissPopup: function () {
		this.props.app.setState({
			showDialog: false
		})
	},
	fullHistory: function () {
		// if(this.props.app.state.impulses != null && this.props.app.state.impulses.length != 0){
			this.props.navigator.push({
				name: 'history',
			});
		// } else {
			// Alert.alert('Not Enough Impulses Registered', 'Please check back in tomorrow to unlock this feature.')
		// }
	},
	addImpulse: function () {
		if(this.state.alert == null || this.state.alert == false){
			this.props.navigator.push({
				name: 'input1',
			});
		}
	}
});