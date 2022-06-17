import React, { useEffect, useState } from 'react';
import InfoTabs from '../Commons/InfoTabs';
import classes from "./Main.module.css";
import MyStockInfo from './MyStockInfo';
import StockSearch from './Main/StockSearch';
import WatchStockChart from './Main/WatchStockChart';

const BASE_URL = 'http://localhost:8090/stock-data'

const Main = () => {
    const [watchStockList, setWatchStockList] = useState([{}]);
    useEffect(() => {
        const fetchWatchStocks = async (userData) => {

            await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                  'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                  id: sessionStorage.getItem('USER'),
                })
            }).then((res) => {
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

      <div className={classes.info}>
        <div className={classes.info__myinfo}>
          <MyStockInfo main="true" />
        </div>

        <InfoTabs stockData={watchStockList} />
      </div>

    </div>
    
  )
}

export default Main