import React from 'react'
import classes from './MarketInfo.module.css'

const MarketInfo = (props) => {
  return (
    <a className={classes.marketinfo} href={props.link} target='_blank'>
        <div className={classes.marketinfo__img}>
        <img src={props.img} alt="" />
        </div>
        <div className={classes.marketinfo__content}>
            <h5>{props.title}</h5>
            <p>{props.description}</p>                
        </div>
    </a>
  )
}

export default MarketInfo