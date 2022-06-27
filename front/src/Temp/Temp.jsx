import React, { useEffect, useState } from 'react';
import InfoTabs from '../Commons/InfoTabs';
import classes from "./Main.module.css";
import MyStockInfo from './MyStockInfo';
import StockSearch from './Main/StockSearch';
import WatchStockChart from './Main/WatchStockChart';

const BASE_URL = 'http://localhost:8090/stock-data'

const Main = () => {
    const [watchStockList, setWatchStockList] = useState([{}]);

      
    let headers = new Headers({
        'Content-Type' : 'application/json'
    });

    const accessToken = sessionStorage.getItem("USER");
    if(accessToken && accessToken !== null){
        headers.append("Authorization", "Bearer " + accessToken);
    }

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