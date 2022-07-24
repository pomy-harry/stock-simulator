import React from 'react'
import CanvasJSReact from '../../assets/canvasjs.stock.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ResultChart2 = (props) => {
	const dataList = [];
    let maximum;
	let minimum;

	for(const key in props.profits){
        if(key == 0){
			minimum = new Date(props.profits[key].date)
			console.log("minimum : " + minimum)
		}
		if(key == props.profits.length - 1){
			maximum = new Date(props.profits[key].date)
			console.log("maximum : " + maximum)
		}
		dataList.push({
			x: new Date(props.profits[key].date),
			y: props.profits[key].profit
		})
	}

	const options = {
		animationEnabled: true,
		exportEnabled: true,
		theme: "light2", // "light1", "dark1", "dark2"
		title:{
			text: "월별 수익률"
		},
		axisY: {
			title: "월별 수익률",
			suffix: "%"
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
			toolTipContent: "{x}: {y}%",
			dataPoints : dataList
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

export default ResultChart2