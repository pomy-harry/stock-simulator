import React from 'react'
import classes from './MyStock.module.css'

const MyStock = (props) => {
  return (
    <>
        <div className={classes.title}>{props.name}</div>
        <div className={classes.stock__box}>
            <div className={classes.row}>매수 금액 : {props.buyPrice}</div>
            <div className={classes.row}>수량 : {props.amount}</div>
            <div className={classes.row}>총액 : {props.price * props.amount}</div>
            <div className={classes.row}>수익률 : {props.price / props.buyPrice * 100}</div>
            <div className={classes.row}>수익 금액 : {(props.price - props.buyPrice) * props.amount}</div>
        </div>
    </>
  )
}

export default MyStock