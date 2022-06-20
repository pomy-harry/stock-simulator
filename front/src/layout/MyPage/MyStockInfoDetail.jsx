import React from 'react'
import classes from './MyStockInfoDetail.module.css'
import "../../static/fonts/font.css"
import StockShowInfoDetailOne from '../../lib/Stock/StockShowInfoDetailOne';

const MyStockInfoDetail = (props) => {

    const myStockList = props.myStockData.map((stock) => (
        <StockShowInfoDetailOne
            name={stock.name}
            totalBuyPrice={stock.totalBuyPrice}
            amount={stock.amount}
            totalNowPrice={stock.totalNowPrice}
        />
    ));

  return (
    <div className={classes.detail}>            
        <ul>{myStockList}</ul>
    </div> 
  )
}

export default MyStockInfoDetail