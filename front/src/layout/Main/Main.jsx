import React, { useEffect, useState } from 'react';
import classes from "./Main.module.css";
import StockSearch from './StockSearch';
import WatchStockChart from './WatchStockChart';
import MyStockSummaryMain from './MyStockSummaryMain';
import SmartTab from './SmartTab';

const BASE_URL = 'http://localhost:8090/stock-data'

let headers = new Headers({
    'Content-Type' : 'application/json'
});

const accessToken = sessionStorage.getItem("USER");
if(accessToken && accessToken !== null){
    headers.append("Authorization", "Bearer " + accessToken);
}

const Main = () => {
    const [watchStockList, setWatchStockList] = useState([{}]);
  
    useEffect(() => {
        const fetchWatchStocks = async (userData) => {
            await fetch(BASE_URL, {headers: headers}).then((res) => {
                if(res.ok){
                res.json().then((res2) => {
                    setWatchStockList(res2);
                })
                }else{
                res.json().then((res2) => console.log(res2));
                }
            })
            }
            fetchWatchStocks().catch(error => {
                console.log(error);
            })
    }, []);

  return (
    <div className={classes.main}>

        <div className={classes.chart}>
            <StockSearch />
            <WatchStockChart watchStockList={watchStockList}/>
        </div>

        <div className={classes.tab}>
            <MyStockSummaryMain />
            <SmartTab watchStockList={watchStockList} />
        </div>

    </div>
  )
}

export default Main