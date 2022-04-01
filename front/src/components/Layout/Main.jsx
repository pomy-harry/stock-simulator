import React, { useEffect, useState } from 'react';
import StockList from './ComboBox';
import InfoTabs from '../Commons/InfoTabs';
import Stock from '../Stock/Stock';
import classes from "./Main.module.css";
import MyStockInfo from './MyStockInfo';

const BASE_URL = 'http://localhost:8090/stock-data'

const Main = () => {

  const [watchStocks, setWatchStocks] = useState([{}]);
  
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
            setWatchStocks(res2);
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
  
  const watchStock = watchStocks.map((stock) => (

    <Stock 
      key={stock.id}
      code={stock.code}
      name={stock.name}
      price={stock.price}
      change={stock.change}
      changeRate={stock.changeRate}
      chartUrl={stock.chartUrl}
    />
  ));

  return (
    <div className={classes.main}>

      <div className={classes.chart}>
        <form className={classes.chart__search}>
            <StockList className={classes.chart__search__input}></StockList>
        </form>
        <div className={classes.chart__list}>
          <ul>
            {watchStock}
          </ul>
        </div>
      </div>

      <div className={classes.info}>
        <div className={classes.info__myinfo}>
          <MyStockInfo main="true" />
        </div>

        <InfoTabs stockData={watchStocks} />
      </div>

    </div>
    
  )
}

export default Main