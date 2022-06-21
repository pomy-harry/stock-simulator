import React from 'react'
import classes from './MyStock.module.css'

const MyStock = (props) => {
  return (
    <>
        <div className={classes.title}>{props.name}</div>
        <div className={classes.stock__box}>
            <div className={classes.row}>매수 금액 : {props.totalBuyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</div>
            <div className={classes.row}>보유수량 : {props.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 개</div>
            <div className={classes.row}>평가금액 : {props.totalNowPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</div>
            <div className={classes.row}>
              <span>수익률 : </span>  
              <span className={(props.totalNowPrice - props.totalBuyPrice) > 0 ? classes.red : classes.blue}>
                {((props.totalNowPrice - props.totalBuyPrice) / props.totalBuyPrice * 100).toFixed(3)}
              </span>
              <span> %</span>
            </div>
            <div className={classes.row}>평가손익 : {(props.totalNowPrice - props.totalBuyPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</div>
        </div>
    </>
  )
}

export default MyStock