import React from 'react'
import classes from './MarketInfo.module.css'

const MarketInfo = (props) => {
  return (
    <div className={classes.marketinfo}>
        <div className={classes.marketinfo__img}>
        <img src={props.img} alt="" />
        </div>
        <div className={classes.marketinfo__content}>
            <h5>{props.title}</h5>
            <p>{props.description}</p>                
        </div>
    </div>
  )
}

export default MarketInfo