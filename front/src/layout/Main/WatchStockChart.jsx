import React from 'react'
import classes from "./WatchStockChart.module.css";
import StockShowChartOne from '../../features/Stock/StockShowChartOne';
const WatchStockChart = (props) => {
    const watchStockChartList = props.watchStockList && props.watchStockList.map((stock) => (
        <StockShowChartOne 

            key={stock.id}
            code={stock.code}
            name={stock.name}
            price={stock.price}
            change={stock.change}
            changeRate={stock.changeRate}
            chartUrl={stock.chartUrl}
            stockData={props.stockData}
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