import { Button } from '@mui/material'
import React from 'react'
import classes from './Stock.module.css'

const BASE_URL = 'http://localhost:8090/stocks/watch'

const Stock = (props) => {

  const clickDelHandler = async() => {
    await fetch(BASE_URL, {
      method: 'Delete',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        code: props.code
      })
    })

    window.location.reload();
  }

  return (
      <div className={classes.stock_data}>
        <button onClick={clickDelHandler} className={classes.stock_data_closebutton}>X</button>
        <div>
          <div className={classes.stock_data__header}>
            <h1>{props.name}</h1>
            <div className={classes.stock_data__header_sub}>
                <h2>{props.price}</h2>
                <h4>{props.changeRate}</h4>
                <h4>{props.change}</h4>
            </div>
          </div>

          <div className={classes.stock_data__chart}>
            <img src={props.chartUrl} alt="" />
          </div>
        </div>
      </div>

  )
}

export default Stock