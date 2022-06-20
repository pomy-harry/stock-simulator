import React, { useState } from 'react'
import "../../../static/fonts/font.css"
import classes from './SmartTab.module.css'
import { Tab, Tabs, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import BuySellStockTab from '../../Tabs/BuySellStockTab';
import MarketInfo from './MarketInfo';

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


const SmartTab = (props) => {

    const [tabValue, setTabValue] = useState(0);
    const handleInfoTabChange = (event, newTabValue) => {
        setTabValue(newTabValue);
    };

  return (
    <div className={classes.smartTab}>
        <Tabs value={tabValue} onChange={handleInfoTabChange} className={classes.smartTab__tabs}>  
          <Tab label="모의투자" {...a11yProps(0)} className={classes.smartTab__tabs__tab}/>
          <Tab label="시장정보" {...a11yProps(1)} className={classes.smartTab__tabs__tab}/>
        </Tabs>

        <TabPanel className={classes.smartTab__tabpanel__bs} value={tabValue} index={0}>
            <BuySellStockTab watchStockList={props.watchStockList} />
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
            <MarketInfo />              
        </TabPanel>
    </div>
  )
}

export default SmartTab