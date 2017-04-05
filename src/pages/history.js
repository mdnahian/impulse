import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableHighlight
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import Store from 'react-native-store';

import Dimensions from 'Dimensions';

import { Bar } from 'react-native-pathjs-charts'

import baseStyle from '../styles/baseStyle';
import historyStyle from '../styles/historyStyle';


const DB = {
    'impulses': Store.model('impulses')
}


var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];




module.exports = React.createClass({
	componentWillMount: function () {
		this.loadData();
	},
	getInitialState: function () {
		return {
			currentView: 'frequency',
			last30: true,
			isLoading:true
		}
	},
	render: function() {

		var currentView;


		var frequencyTabStyle;
	    var frequencyTabStyleText;
	    var historyTabStyle;
	    var historyTabStyleText;

	    if(this.state.currentView == 'frequency'){
	    	frequencyTabStyle = [historyStyle.tab, historyStyle.tabActive];
	    	frequencyTabStyleText = [historyStyle.tabText, historyStyle.tabTextActive];

	    	historyTabStyle = historyStyle.tab;
	    	historyTabStyleText = historyStyle.tabText;
	    } else if(this.state.currentView == 'intensity'){
	    	frequencyTabStyle = historyStyle.tab;
	    	frequencyTabStyleText = historyStyle.tabText;

	    	historyTabStyle = [historyStyle.tab, historyStyle.tabActive];
	    	historyTabStyleText = [historyStyle.tabText, historyStyle.tabTextActive];
	    }


    	var tabs = <View style={historyStyle.tabsContainer}>
			<TouchableHighlight style={frequencyTabStyle} onPress={this.frequency}>
				<Text style={frequencyTabStyleText}>FREQUENCY</Text>
			</TouchableHighlight>

			<TouchableHighlight style={historyTabStyle} onPress={this.intensity}>
				<Text style={historyTabStyleText}>INTENSITY</Text>
			</TouchableHighlight>
		</View>




		if(this.state.isLoading){
			currentView = <View style={historyStyle.chartContainer}><Spinner visible={this.state.isLoading} /></View>;
		} else {


			var impulses = this.state.impulses;

			var data = [];

			if(impulses != null){

				var month_data = [];

				for(var i=0; i<impulses.length; i++){
					current_date = new Date(impulses[i].datetime);

					if(this.state.last30){
						// check if datetime is greater than 1 month old
						if(current_date >= new Date().setMonth(-1)){


							var impulses_count = 0;

							for(var j=0; j<impulses.length; j++){
								next_date = new Date(impulses[j].datetime);
								if(current_date.setHours(0,0,0,0) == next_date.setHours(0,0,0,0)){
									impulses_count++;
									impulses.splice(j, 1);
								}
							}


							month_data.push({
								"v": impulses_count + 1,
								"name": monthNames[current_date.getMonth()] + ' ' + current_date.getUTCDate()
							});


						}
					} else {
						var impulses_count = 0;

						for(var j=0; j<impulses.length; j++){
							next_date = new Date(impulses[j].datetime);
							if(current_date.setHours(0,0,0,0) == next_date.setHours(0,0,0,0)){
								impulses_count++;
								impulses.splice(j, 1);
							}
						}


						month_data.push({
							"v": impulses_count + 1,
							"name": monthNames[current_date.getMonth()] + ' ' + current_date.getUTCDate()
						});
					}
				}

				data.push(month_data);

			}

		    let options = {
		      width: Dimensions.get('window').width * 0.8,
		      height: 250,
		      margin: {
		        top: 20,
		        left: 25,
		        bottom: 50,
		        right: 35
		      },
		      color: '#2F4861',
		      gutter: 20,
		      animate: {
		        type: 'oneByOne',
		        duration: 200,
		        fillTransition: 3
		      },
		      axisX: {
		        showAxis: true,
		        showLines: true,
		        showLabels: true,
		        showTicks: true,
		        zeroAxis: false,
		        orient: 'bottom',
		        label: {
		          fontFamily: 'Arial',
		          fontSize: 8,
		          fontWeight: true,
		          fill: '#34495E'
		        }
		      },
		      axisY: {
		        showAxis: true,
		        showLines: true,
		        showLabels: true,
		        showTicks: true,
		        zeroAxis: false,
		        orient: 'left',
		        label: {
		          fontFamily: 'Arial',
		          fontSize: 8,
		          fontWeight: true,
		          fill: '#34495E'
		        }
		      }
		    }

		    	if(this.state.currentView == 'frequency'){

		    		var circleButtons = <View style={historyStyle.chartCircles}>
						<TouchableHighlight style={historyStyle.statCircleOuter} onPress={this.frequencyView} underlayColor={'transparent'}>
							<View style={[historyStyle.statCircleInner, {backgroundColor:'#2F4861'}]}>
								<Text style={[historyStyle.statCircleNumber, {color:'#ffffff'}]}>✓</Text>
								<Text style={[historyStyle.statCircleLabel, {color:'#ffffff'}]} adjustsFontSizeToFit={true}>LAST 30 DAYS</Text>
							</View>
						</TouchableHighlight>

						<TouchableHighlight style={historyStyle.statCircleOuter} onPress={this.frequencyView} underlayColor={'transparent'}>
							<View style={historyStyle.statCircleInner}>
								<Text style={[historyStyle.statCircleNumber, {fontSize:15, color:'#CAD0DE', fontWeight:'bold'}]}>⚬</Text>
								<Text style={historyStyle.statCircleLabel} adjustsFontSizeToFit={true}>ALL TIME</Text>
							</View>
						</TouchableHighlight>
					</View>

					if(!this.state.last30){
						circleButtons = <View style={historyStyle.chartCircles}>
							<TouchableHighlight style={historyStyle.statCircleOuter} onPress={this.frequencyView} underlayColor={'transparent'}>
								<View style={historyStyle.statCircleInner}>
									<Text style={[historyStyle.statCircleNumber, {fontSize:15, color:'#CAD0DE', fontWeight:'bold'}]}>⚬</Text>
									<Text style={historyStyle.statCircleLabel} adjustsFontSizeToFit={true}>LAST 30 DAYS</Text>
								</View>
							</TouchableHighlight>

							<TouchableHighlight style={historyStyle.statCircleOuter} onPress={this.frequencyView} underlayColor={'transparent'}>
								<View style={[historyStyle.statCircleInner, {backgroundColor:'#2F4861'}]}>
									<Text style={[historyStyle.statCircleNumber, {color:'#ffffff'}]}>✓</Text>
									<Text style={[historyStyle.statCircleLabel, {color:'#ffffff'}]} adjustsFontSizeToFit={true}>ALL TIME</Text>
								</View>
							</TouchableHighlight>
						</View>
					}


					currentView = <View style={historyStyle.chartContainer}>
						<View style={historyStyle.chart}>
							<Bar data={data} options={options} accessorKey='v'/>
						</View>

						{circleButtons}
					</View>



				} else if(this.state.currentView == 'intensity'){
		    		currentView = <View style={historyStyle.chartContainer}>
						
					</View>
		    	}

	    }



		return <View style={baseStyle.container}>
			{tabs}
			{currentView}
			<TouchableHighlight style={historyStyle.closeBtn} underlayColor={'transparent'} onPress={this.closeBtnPressed}>
				<Image style={historyStyle.closeBtnImage} source={require('../../img/down.png')}/>
			</TouchableHighlight>
		</View>
	},
	closeBtnPressed: function () {
		this.props.navigator.pop();
	},	
	frequency: function () {

		this.loadData();

		this.setState({
			currentView: 'frequency',
			isLoading:true
		})
	},
	intensity: function () {

		this.loadData();

		this.setState({
			currentView: 'intensity',
			isLoading:true
		})
	},
	frequencyView: function () {

		this.loadData();

		if(this.state.last30){
			this.setState({
				last30: false,
				isLoading:true
			});
		} else {
			this.setState({
				last30: true,
				isLoading:true
			});
		}
	},
	loadData: function () {
		DB.impulses.find().then(resp => this.setState({
			impulses: resp,
			isLoading: false
		}));
	}
});