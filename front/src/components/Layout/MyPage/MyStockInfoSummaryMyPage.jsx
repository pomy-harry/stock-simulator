import React from 'react'
import classes from './MyStockInfoSummaryMyPage.module.css'
import "../../../static/fonts/font.css"

const MyStockInfoSummaryMyPage = (props) => {

  return (    
    <div className={classes.summary}>
        <span>현재 수익률</span>
        <span className={(props.sumTotalNowPrice - props.sumTotalBuyPrice)>0 ? classes.rate__red : classes.rate__blue}>{props.sumTotalBuyPrice!==0? ((props.sumTotalNowPrice - props.sumTotalBuyPrice) / props.sumTotalBuyPrice * 100).toFixed(3) : 0}%</span>
        <span>{(props.sumTotalNowPrice - props.sumTotalBuyPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</span>
    </div>
  )
}

export default MyStockInfoSummaryMyPage