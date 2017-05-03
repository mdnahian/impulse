import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	Alert,
	TextInput,
	TouchableHighlight
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import Store from 'react-native-store';

import Dimensions from 'Dimensions';

import { Bar, StockLine } from 'react-native-pathjs-charts'

import baseStyle from '../styles/baseStyle';
import historyStyle from '../styles/historyStyle';

import PopupDialog from 'react-native-popup-dialog';

import Table from 'react-native-simple-table';


const DB = {
    'impulses': Store.model('impulses'),
    'archives': Store.model('archives')
}


var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];





const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: Dimensions.get('window').width * 0.75 * 0.33
  },
  {
    title: 'Resisted',
    dataIndex: 'resisted',
    width: Dimensions.get('window').width * 0.75 * 0.33
  },
  {
    title: 'Succumbed',
    dataIndex: 'succumbed',
    width: Dimensions.get('window').width * 0.75 * 0.34
  },
];








module.exports = React.createClass({
	componentWillMount: function () {
		this.loadData();
	},
	getInitialState: function () {
		return {
			currentView: 'frequency',
			last30: true,
			isLoading:true,
			isNoData: false,
			showDialog:false,
			archiveName: '',
			archives: null
		}
	},
	render: function() {


		if(this.state.isLoading){
			return <View><Text allowFontScaling={false} >Loading...</Text></View>;
		}


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
    		<TouchableHighlight style={historyStyle.saveBtnContainer} onPress={this.saveBtnPressed} underlayColor={'#dedede'}>
				<Image style={historyStyle.saveBtn} source={require('../../img/save.png')}/>
			</TouchableHighlight>

			<TouchableHighlight style={frequencyTabStyle} onPress={this.frequency} underlayColor={'#dedede'}>
				<Text allowFontScaling={false}  style={frequencyTabStyleText}>FREQUENCY</Text>
			</TouchableHighlight>

			<TouchableHighlight style={historyTabStyle} onPress={this.intensity} underlayColor={'#dedede'}>
				<Text allowFontScaling={false}  style={historyTabStyleText}>INTENSITY</Text>
			</TouchableHighlight>
		</View>




		if(this.state.isLoading){
			currentView = <View style={historyStyle.chartContainer}><Spinner visible={this.state.isLoading} /></View>;
		} else {


			var impulses = this.state.impulses;


			var data = [];
			var new_data = [];

			if(impulses != null && impulses.length > 1){

				var month_data = [];

				for(var i=0; i<impulses.length; i++){
					current_date = new Date(impulses[i].datetime);

					if(this.state.last30){
						// check if datetime is greater than 1 month old
						if(current_date >= new Date().setMonth(-1)){

							if(this.state.currentView == 'frequency'){
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
							} else if(this.state.currentView == 'intensity'){
								month_data.push({
									"x": i,
									"y": impulses[i].impulse
								})
							}
						}
					} else {

						if(this.state.currentView == 'frequency'){

							var impulses_count = 0;

							for(var j=0; j<impulses.length; j++){
								next_date = new Date(impulses[j].datetime);
								if(current_date.getMonth() == next_date.getMonth()){
									impulses_count++;
									impulses.splice(j, 1);
								}
							}


							month_data.push({
								"v": impulses_count + 1,
								"name": monthNames[current_date.getMonth()]
							});

						} else if(this.state.currentView == 'intensity'){
							month_data.push({
								"x": i,
								"y": impulses[i].impulse
							})
						}
					}
				}

				data.push(month_data);

				if(this.state.currentView == 'frequency'){
					if(data.length > 0){

						var name = data[0][0].name;
						var curr_impulses = 0;
						

						for(var i=0; i<data[0].length; i++){
							if(data[0][i].name == name){
								curr_impulses += data[0][i].v;
							} else {

								new_data.push({
									"v": curr_impulses,
									"name": name
								});

								name = data[0][i].name;
								curr_impulses = data[0][i].v;
								
							}


							if(data[0].length-1 == i){
								new_data.push({
									"v": curr_impulses,
									"name": name
								});
							}


						}

					} else {
						this.setState({
							isNoData: true
						});
					}
				}


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
		        showLines: false,
		        showLabels: true,
		        showTicks: true,
		        zeroAxis: false,
		        orient: 'bottom',
		        label: {
		          fontFamily: 'Arial',
		          fontSize: 10,
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
		          fontSize: 10,
		          fontWeight: true,
		          fill: '#34495E'
		        }
		      }
		    }

		    if(this.state.currentView == 'frequency'){
	    		currentView = this.loadContent(new_data, options);
			} else if(this.state.currentView == 'intensity'){
	    		currentView = this.loadContent(data, options);
	    	}

	    }


	    
	    var archives = this.props.app.state.archives;

	    var datasource = [];

	    if(archives != null){
	    
	    	for(var i=0; i<archives.length; i++){
	    		var succumbed = 0;
	    		var resisted = 0;

	    		if(archives[i].archive != null){
	    			for(var j=0; j<archives[i].archive.length; j++){
		    			if(!archives[i].archive[j].succumbed){
		    				succumbed++;
		    			} else {
		    				resisted++;
		    			}
		    		}
	    		}

	    		datasource.push({
	    			"name": archives[i].name,
	    			"succumbed": succumbed,
	    			"resisted": resisted
	    		})
	    	}

	    }
		



		return <View style={baseStyle.container}>
			{tabs}
			{currentView}
			<TouchableHighlight style={historyStyle.closeBtn} underlayColor={'transparent'} onPress={this.closeBtnPressed}>
				<Image style={historyStyle.closeBtnImage} source={require('../../img/down.png')}/>
			</TouchableHighlight>

			<PopupDialog
				width={0.75}
				show={this.state.showDialog}
			    ref={(popupDialog) => { this.popupDialog = popupDialog }}>
			    <View style={baseStyle.dialogContainer}>
			    	<TouchableHighlight style={historyStyle.closeButton} onPress={this.dismissPopup} underlayColor={'#ffffff'}>
						<Image style={historyStyle.closeButtonImage} source={require('../../img/closeGray.png')}/>
					</TouchableHighlight>

			    	<View style={historyStyle.popupDialog}>
			    		<View style={historyStyle.inputGroup}>
			    			<TextInput 
				    			style={historyStyle.archiveInput}
				    			onChangeText={(text) => this.setState({archiveName: text})}
				    			placeholder={'name'}/>

				    		<TouchableHighlight style={historyStyle.archiveBtn} onPress={this.archiveBtnPressed} underlayColor={'transparent'}>
				    			<Text allowFontScaling={false} style={historyStyle.archiveText}>Archive</Text>
				    		</TouchableHighlight>
			    		</View>

			    		<View style={historyStyle.archiveTable}>
			    			<Table width={1} columnWidth={60} columns={columns} dataSource={datasource}/>
			    		</View>
			    	</View>
				</View>
			</PopupDialog>
		</View>
	},
	archiveBtnPressed: function () {
		if(this.state.archiveName != ""){
			Alert.alert(
			  'Archiving Impulse Data',
			  'This will reset the impulse count to zero. Are you sure?',
			  [
			    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
			    {text: 'Yes', onPress: () => this.archiveData()},
			  ],
			  { cancelable: false }
			)
		}
	},
	archiveData: function () {
		
		DB.archives.add({
			name: this.state.archiveName,
			archive: this.props.app.state.impulses
		}).then((token) => {
			this.props.app.setState({
				isLoading:true
			})

			DB.impulses.remove().then(() => {
				this.props.app.getImpulses();
				this.props.app.getArchieves();
				this.setState({
					showDialog:false
				});
				this.props.navigator.pop();
			});
		});

	},
	saveBtnPressed: function () {
		DB.archives.find().then(resp => this.setState({
			archives: resp,
			showDialog:true
		}));
	},
	dismissPopup: function () {
		this.setState({
			showDialog: false
		})
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
		this.setState({
			isLoading: true
		})

		DB.impulses.find().then((resp1) => {

			DB.archives.find().then(resp2 => this.setState({
				impulses: resp1,
				archives: resp2,
				isLoading: false
			}));

		});
	},
	loadContent: function (data, options) {
		var circleButtons = <View style={historyStyle.chartCircles}>
			<TouchableHighlight style={historyStyle.statCircleOuter} onPress={this.frequencyView} underlayColor={'transparent'}>
				<View style={[historyStyle.statCircleInner, {backgroundColor:'#2F4861'}]}>
					<Text allowFontScaling={false}  style={[historyStyle.statCircleNumber, {color:'#ffffff'}]}>✓</Text>
					<Text allowFontScaling={false}  style={[historyStyle.statCircleLabel, {color:'#ffffff'}]} adjustsFontSizeToFit={true}>LAST 30 DAYS</Text>
				</View>
			</TouchableHighlight>

			<TouchableHighlight style={historyStyle.statCircleOuter} onPress={this.frequencyView} underlayColor={'transparent'}>
				<View style={historyStyle.statCircleInner}>
					<Text allowFontScaling={false}  style={[historyStyle.statCircleNumber, {fontSize:15, color:'#CAD0DE', fontWeight:'bold'}]}>⚬</Text>
					<Text allowFontScaling={false}  style={historyStyle.statCircleLabel} adjustsFontSizeToFit={true}>ALL TIME</Text>
				</View>
			</TouchableHighlight>
		</View>

		if(!this.state.last30){
			circleButtons = <View style={historyStyle.chartCircles}>
				<TouchableHighlight style={historyStyle.statCircleOuter} onPress={this.frequencyView} underlayColor={'transparent'}>
					<View style={historyStyle.statCircleInner}>
						<Text allowFontScaling={false}  style={[historyStyle.statCircleNumber, {fontSize:15, color:'#CAD0DE', fontWeight:'bold'}]}>⚬</Text>
						<Text allowFontScaling={false}  style={historyStyle.statCircleLabel} adjustsFontSizeToFit={true}>LAST 30 DAYS</Text>
					</View>
				</TouchableHighlight>

				<TouchableHighlight style={historyStyle.statCircleOuter} onPress={this.frequencyView} underlayColor={'transparent'}>
					<View style={[historyStyle.statCircleInner, {backgroundColor:'#2F4861'}]}>
						<Text allowFontScaling={false}  style={[historyStyle.statCircleNumber, {color:'#ffffff'}]}>✓</Text>
						<Text allowFontScaling={false}  style={[historyStyle.statCircleLabel, {color:'#ffffff'}]} adjustsFontSizeToFit={true}>ALL TIME</Text>
					</View>
				</TouchableHighlight>
			</View>
		}


		if(data.length < 2){
			if(this.state.isNoData || this.state.currentView != 'intensity') {
				return <View style={historyStyle.chartContainer}>
					<View style={historyStyle.chart}>
						<Image style={historyStyle.placeholder} source={require('../../img/placeholder.png')}/>
					</View>

					{circleButtons}
				</View>
			}
		}

		if(this.state.currentView == 'frequency'){
			var d = [data];

			if(last30){
				d = d.slice(Math.max(d.length - 10, 0))
			}

			return <View style={historyStyle.chartContainer}>
				<View style={historyStyle.chart}>
					<Bar data={d} options={options} accessorKey='v'/>
				</View>

				{circleButtons}
			</View>
		}

		if(this.state.currentView == 'intensity') {
			return <View style={historyStyle.chartContainer}>
				<View style={historyStyle.chart}>
					<StockLine data={data} options={options} xKey='x' yKey='y' />
					<Text allowFontScaling={false}  style={{marginTop:-20}}>Impulses</Text>
				</View>

				{circleButtons}
			</View>
		}

		
	}
});