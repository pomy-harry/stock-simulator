import React from 'react'
import CanvasJSReact from '../../assets/canvasjs.stock.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ResultChart = (props) => {
	const dataList = [];
	let maximum;
	let minimum;

	for(const key in props.balances){
		if(key == 0){
			minimum = new Date(props.balances[key].date)
			console.log("minimum : " + minimum)
		}
		if(key == props.balances.length - 1){
			maximum = new Date(props.balances[key].date)
			console.log("maximum : " + maximum)
		}
		dataList.push({
			x: new Date(props.balances[key].date),
			y: props.balances[key].balance
		})
	}

	const options = {
		animationEnabled: true,
		exportEnabled: true,
		theme: "light2", // "light1", "dark1", "dark2"
		title:{
			text: "월별 자산 현황"
		},
		axisY: {
			suffix: "원"
		},
		axisX: {
			//title: "Week of Year",
			//prefix: "월",
			//interval: 2
			minimum: minimum,
			maximum: maximum
		},
		data: [{
			type: "line",
			toolTipContent: "{x}: {y}원",
			dataPoints : dataList,
			
		}]
	}
	return (
	<div>
		<CanvasJSChart options = {options}
			/* onRef={ref => this.chart = ref} */
		/>
		{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
	</div>
	);
}

export default ResultChart