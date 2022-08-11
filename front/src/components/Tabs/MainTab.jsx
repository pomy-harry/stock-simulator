import React, { useState } from 'react'
import "../../static/fonts/font.css"
import classes from './MainTab.module.css'
import { Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';
import StockBuySellTab from './StockBuySellTab';
import MarketInfoShowInfo from '../../features/MarketInfo/MarketInfoShowInfo';
import TabPanel from './Commons/TabPanel';
import BackTesting from '../../features/BackTest/BackTesting';
import BackTestingResult from '../../features/BackTest/BackTestingResult';

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

    const [startMoney, setStartMoeny] = useState(0);
    const [endMoney, setEndMoney] = useState(0);
    const [cagr, setCagr] = useState(0);
    const [stdev, setStdev] = useState(0);
    const [bestYear, setBestYear] = useState(0);
    const [worstYear, setWorstYear] = useState(0);
    const [balances, setBalances] = useState([]);
    const [profits, setProfits] = useState([]);

    const [backtest, setBacktest] = useState(true);
    const openBacktest = () => {
        console.log("openBacktest");
        setBacktest(true);
    }

    const openBacktestResult = (startMoney, endMoney, cagr, stdev, bestYear, worstYear, balances, profits) => {
        setStartMoeny(startMoney);
        setEndMoney(endMoney);
        setCagr(cagr);
        setStdev(stdev);
        setBestYear(bestYear);
        setWorstYear(worstYear);
        setBalances(balances);
        setProfits(profits);

        console.log("openBacktestResult");
        setBacktest(false);
    }

  return (
    <>
        <Tabs value={tabValue} onChange={handleInfoTabChange} className={classes.smartTab__tabs}>  
          <Tab label="모의투자" {...a11yProps(0)} className={classes.smartTab__tabs__tab}/>
          <Tab label="시장정보" {...a11yProps(1)} className={classes.smartTab__tabs__tab}/>
          <Tab label="투자전략" {...a11yProps(2)} className={classes.smartTab__tabs__tab}/>
        </Tabs>

        <TabPanel className={classes.smartTab__tabpanel__bs} value={tabValue} index={0}>
            <StockBuySellTab watchStockList={props.watchStockList} />            
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
            <MarketInfoShowInfo />   
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
            {
                backtest === true
                ? <BackTesting onOpenBacktest = {openBacktestResult}/>
                : <BackTestingResult onOpenBacktestResult = {openBacktest}
                startMoney = {startMoney} 
                endMoney = {endMoney} 
                cagr = {cagr} 
                stdev = {stdev} 
                bestYear = {bestYear} 
                worstYear = {worstYear} 
                balances = {balances} 
                profits = {profits}
                />
            }
        </TabPanel>
    </>
  )
}

export default MainTab