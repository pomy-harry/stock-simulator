import React from 'react'
import classes from './Stock.module.css'

const Stock = (props) => {

  return (
        <div className={classes.chart__list__one}>
            <div className={classes.chart__list__one__header}>
              <h1>{props.name}</h1>
              <h2>{props.price}</h2>
            </div>
            <div className={classes.chart__list__one__body}>
              <h3>{props.change}</h3>
              <h3>{props.changeRate}</h3>
            </div>
            <div className={classes.chart__list__one__chart}>
              <img src={props.chartUrl} alt="" />
            </div>
          </div>

  )
}

export default Stock