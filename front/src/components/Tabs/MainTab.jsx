import React, { useState } from 'react'
import "../../static/fonts/font.css"
import classes from './MainTab.module.css'
import { Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';
import StockBuySellTab from './StockBuySellTab';
import MarketInfoShowInfo from '../../lib/MarketInfo/MarketInfoShowInfo';
import TabPanel from './Commons/TabPanel';

const MainTab = (props) => {

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

    const [tabValue, setTabValue] = useState(0);
    const handleInfoTabChange = (event, newTabValue) => {
        setTabValue(newTabValue);
    };

  return (
    <>
        <Tabs value={tabValue} onChange={handleInfoTabChange} className={classes.smartTab__tabs}>  
          <Tab label="모의투자" {...a11yProps(0)} className={classes.smartTab__tabs__tab}/>
          <Tab label="시장정보" {...a11yProps(1)} className={classes.smartTab__tabs__tab}/>
        </Tabs>

        <TabPanel className={classes.smartTab__tabpanel__bs} value={tabValue} index={0}>
            <StockBuySellTab watchStockList={props.watchStockList} />            
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
            <MarketInfoShowInfo />   
        </TabPanel>
    </>
  )
}

export default MainTab