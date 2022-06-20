import React, { useState } from 'react'
import "../../static/fonts/font.css"
import classes from './StockBuySellTab.module.css'
import { Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';
import StockBuy from '../../lib/Stock/StockBuy';
import StockSell from '../../lib/Stock/StockSell';
import TabPanel from './Commons/TabPanel';

const StockBuySellTab = (props) => {

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };
      
    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    };

    const [tabValueBS, setTabValueBS] = useState(0);
    const handleInfoTabChangeBS = (event, newTabValue) => {
        setTabValueBS(newTabValue);
    };    
    
  return (

    <>
        <Tabs value={tabValueBS} onChange={handleInfoTabChangeBS} className={classes.bs__tabs}>  
            <Tab label="매도" {...a11yProps(0)} className={classes.bs__tabs__tab}/>
            <Tab label="매수" {...a11yProps(1)} className={classes.bs__tabs__tab}/>
        </Tabs>

        <TabPanel className={classes.bs__tabpanel} value={tabValueBS} index={0}>
            <StockBuy watchStockList={props.watchStockList} />
        </TabPanel>

        <TabPanel className={classes.bs__tabpanel} value={tabValueBS} index={1}>
            <StockSell watchStockList={props.watchStockList} />            
        </TabPanel>
    </>
    
  )
}

export default StockBuySellTab