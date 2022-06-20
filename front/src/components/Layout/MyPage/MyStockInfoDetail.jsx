import React from 'react'
import classes from './MyStockInfoDetail.module.css'
import "../../../static/fonts/font.css"
import MyStock from '../../Stock/MyStock';

const MyStockInfoDetail = (props) => {

    const myStockList = props.myStockData.map((stock) => (
        <MyStock
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