import React from 'react'
import classes from './MyStock.module.css'

const MyStock = (props) => {
  return (
    <>
        <div className={classes.title}>{props.name}</div>
        <div className={classes.stock__box}>
            <div className={classes.row}>매수 금액 : {props.buyPrice}원</div>
            <div className={classes.row}>수량 : {props.amount}개</div>
            <div className={classes.row}>총액 : {props.price * props.amount}원</div>
            <div className={classes.row}>
              <span>수익률 : </span>  
              <span className={(props.price - props.buyPrice) > 0 ? classes.red : classes.blue}>
                {((props.price - props.buyPrice) / props.buyPrice * 100).toFixed(3)}
              </span>
              <span>%</span>
            </div>
            <div className={classes.row}>수익 금액 : {(props.price - props.buyPrice) * props.amount}원</div>
        </div>
    </>
  )
}

export default MyStock