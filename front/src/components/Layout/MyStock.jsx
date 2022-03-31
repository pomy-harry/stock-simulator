import React from 'react'
import classes from './MyStock.module.css'

const MyStock = (props) => {
  return (
    <>
        <div className={classes.title}>{props.title}</div>
        <div className={classes.stock__box}>
            <div className={classes.row}>매수 금액 : {props.buyPrice}</div>
            <div className={classes.row}>수량 : {props.amount}</div>
            <div className={classes.row}>총액 : {props.totalPrice}</div>
            <div className={classes.row}>수익률 : {props.profitRate}</div>
            <div className={classes.row}>수익 금액 : {props.profit}</div>
        </div>
    </>
  )
}

export default MyStock