import React from 'react'
import classes from "./WatchStockChart.module.css";
import StockChart from '../../Chart/StockChart';


const WatchStockChart = (props) => {

    const watchStockChartList = props.watchStockList.map((stock) => (
        <StockChart 
            key={stock.id}
            code={stock.code}
            name={stock.name}
            price={stock.price}
            change={stock.change}
            changeRate={stock.changeRate}
            chartUrl={stock.chartUrl}
        />
    ));

  return (
    <div className={classes.chart__list}>
        <ul>
            {watchStockChartList}
        </ul>
    </div>
  )
}

export default WatchStockChart