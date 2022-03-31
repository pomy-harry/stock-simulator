import { Button } from '@mui/material'
import React, { useState } from 'react'
import classes from './Stock.module.css'



const Stock = (props) => {
  
  // let state = "";

  // if(props.change.charAt(0) === "▲") {
  //   state = true;
  //   console.log(state);
  // } else if(props.change.charAt(0) === "▼") {
  //   state = false;
  //   console.log(state);
  // } else {
  //   state = "normal";
  //   console.log(state);
  // }
  
  return (
      <div className={classes.stock_data}>
        <div>
          <button className={classes.stock_data_closebutton}>X</button> 
        </div>
        <div>
          <div className={classes.stock_data__header}>
            <h1>{props.name}</h1>
            {/* <div className={state=="normal" ? classes.stock_data__header_sub3 : state==true ? classes.stock_data__header_sub1 : classes.stock_data__header_sub2}> */}
            <div className={classes.stock_data__header_sub1}>
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