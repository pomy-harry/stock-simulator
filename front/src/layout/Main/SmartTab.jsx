import React from 'react'
import "../../static/fonts/font.css"
import classes from './SmartTab.module.css'
import MainTab from '../../components/Tabs/MainTab';


const SmartTab = (props) => {

  return (
    <div className={classes.smartTab}>
        <MainTab watchStockList={props.watchStockList}/>        
    </div>
  )
}

export default SmartTab