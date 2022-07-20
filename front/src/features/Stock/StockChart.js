import React, { Component, useEffect, useState } from 'react';
import CanvasJSReact from '../../assets/canvasjs.stock.react';
import { isEmpty } from 'lodash';
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;
const BASE_URL = 'http://localhost:8090/stock-data'

const StockChart = (props) => {
	const [a, setA] = useState({isLoaded: false, dataPoints1: [], dataPoints2: [], dataPoints3: []});
	const [options, setOptions] = useState({});
	const [containerProps, setContainerProps] = useState({});
	useEffect(() => {
		if(!isEmpty(props.stockData)) {
			const a = props.stockData;
			let dps1 = [], dps2 = [], dps3 = [];
			for (var i = 0; i< a.length; i++) {
				dps1.push({
					x: new Date(a[i].tradeDate),
					y: [
						Number(a[i].startPrice),
						Number(a[i].highPrice),	
						Number(a[i].lowPrice),
						Number(a[i].lastPrice),
					]
				});
				dps2.push({x: new Date(a[i].tradeDate), y: Number(a[i].tradeVolume)});
				dps3.push({x: new Date(a[i].tradeDate), y: Number(a[i].lastPrice)});
				setA({
					isLoaded: true,
					dataPoints1: dps1,
					dataPoints2: dps2,
					dataPoints3: dps3
				})
			}
			console.log(dps1);
			console.log(dps2);
			console.log(dps3);
			setOptions({
				theme: "light2",
				charts: [{
				axisX: {
					lineThickness: 5,
					tickLength: 0,
					labelFormatter: function(e) {
					return "";
					},
					crosshair: {
					enabled: true,
					snapToDataPoint: true,
					labelFormatter: function(e) {
						return "";
					}
					}
				},
				axisY: {
					title: "",
					suffix: "won",
					tickLength: 0
				},
				toolTip: {
					shared: true
				},
				data: [{
					name: "Price (in Won)",
					yValueFormatString: "#,### Won",
					type: "candlestick",
					dataPoints : dps1
				}]
				},{
				height: 100,
				axisX: {
					crosshair: {
					enabled: true,
					snapToDataPoint: true
					}
				},
				axisY: {
					title: "",
					suffix: "won",
					tickLength: 0
				},
				toolTip: {
					shared: true
				},
				data: [{
					name: "Volume",
					yValueFormatString: "#,### Won",
					type: "column",
					dataPoints : dps2
				}]
				}],
				navigator: {
				data: [{
					dataPoints: dps3
				}],
				slider: {
					minimum: new Date("2018-05-01"),
					maximum: new Date("2022-07-19")
				}
				}
			});
			setContainerProps({
				width: "100%",
				height: "450px",
				margin: "auto"
			});
			console.log(options);
		}
		
	},[props.stockData]);

	
	return (
		<div> 
		{
			// Reference: https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator
			a.isLoaded && 
			<CanvasJSStockChart containerProps={containerProps} options = {options}
			/* onRef = {ref => this.chart = ref} */
			/>
		}
	</div>
	);
}


export default StockChart;