import React, { useState } from 'react'
import "../../static/fonts/font.css"
import classes from './BuySellStockTab.module.css'
import { Tab, Tabs, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import BuyStockForm from '../Forms/BuyStockForm';
import SellStockForm from '../Forms/SellStockForm';

// --- Tab관련 부분 -------------------------------------------------------
const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    
    return (
        <div
            className={classes.tab__body__news}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};
  
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
// ------------------------------------------------------------------------


const BuySellStockTab = (props) => {    

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
            <BuyStockForm watchStockList={props.watchStockList} />
        </TabPanel>

        <TabPanel className={classes.bs__tabpanel} value={tabValueBS} index={1}>
            <SellStockForm watchStockList={props.watchStockList} />            
        </TabPanel>
    </>
    
  )
}

export default BuySellStockTab