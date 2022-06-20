import React from 'react'
import classes from "./WatchStockChart.module.css";
import StockShowChartOne from '../../lib/Stock/StockShowChartOne';


const WatchStockChart = (props) => {

    const watchStockChartList = props.watchStockList.map((stock) => (
        <StockShowChartOne 
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