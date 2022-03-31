import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import StockList from './ComboBox';
import InfoTabs from '../Commons/InfoTabs';
import Stock from '../Stock/Stock';
import classes from "./Main.module.css";

const BASE_URL = 'http://localhost:8090/stockData'

// const STOCKS = [
//     {
//       code:'주식1', 
//       name:'001234', 
//       price:'10000', 
//       change: '하락 300', 
//       changeRate:"-0.43%", 
//       chartUrl:"https://ssl.pstatic.net/imgfinance/chart/item/candle/day/005930.png?sidcode=1648623050282",
//   },
// ];

const Main = () => {

  const [watchStocks, setWatchStocks] = useState([{}]);
  
  useEffect(() => {
    const fetchWatchStocks = async (userData) => {

      // console.log("호출");

      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
          id: sessionStorage.getItem('USER'),
          // email: "minki0415@naver.com",
          // name: "김민기",
          // password: "!1234"
        })
      }).then((res) => {
        if(res.ok){
          res.json().then((res2) => {
            // console.log(res2);
            setWatchStocks(res2);
          })
        }
      })
    }

    
    fetchWatchStocks().catch(error => {
      console.log(error);
    })
  }, []);
  
  // const watchStock1 = watchStocks[0];
  // const watchStock2 = watchStocks[1];
  // console.log("watchstocks1", watchStock1);
  
  const watchStock3 = watchStocks.map((stock) => (

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

  // console.log(watchStock3);

  return (
    <div className={classes.main}>

      <div className={classes.chart}>
        <form className={classes.chart__search}>
            {/* <Input className={classes.chart__search__input} placeholder="검색" type='text' /> */}
            <StockList className={classes.chart__search__input}></StockList>
            <Button className={classes.chart__search__button2}>버튼2</Button>
        </form>
        <div className={classes.chart__list}>
          <ul>
            {watchStock3}
          </ul>
        </div>
      </div>

      <div className={classes.info}>
        <div className={classes.info__myinfo}>
          내 주식 정보
        </div>

        <InfoTabs />
      </div>

    </div>
    
  )
}

export default Main