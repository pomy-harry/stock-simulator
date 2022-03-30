import React from 'react'
import classes from './Stock.module.css'

const Stock = (props) => {

  return (
      <div className={classes.stock_data}>
          <div className={classes.stock_data__header}>
            <h1>{props.name}</h1>
            <div className={classes.stock_data__header_sub}>
                <h2>{props.price}</h2>
                <h4>{props.changeRate}</h4>
                <h4>{props.change}</h4>
            </div>
          </div>
          {/* <div className={classes.stock_data__body}>
            <h3>{props.change}</h3>
          </div> */}
          <div className={classes.stock_data__chart}>
            <img src={props.chartUrl} alt="" />
          </div>
      </div>

  )
}

export default Stock