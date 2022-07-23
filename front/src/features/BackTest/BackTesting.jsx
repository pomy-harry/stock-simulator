import React, { forwardRef, useState, useEffect } from 'react'
import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import NumberFormat from 'react-number-format';
import classes from './BackTesting.module.css'

const STOCK_URL = 'http://localhost:8090/stocks';
const BASE_URL = 'http://localhost:8090/backtest';

const NumberFormatCustom = forwardRef((props, ref) => {
  const { onChange, ...other } = props;

  return (
      <NumberFormat
          {...other}
          customInput={TextField}
          thousandSeparator
          isNumericString
          suffix=" 원"
          type="text"
          onValueChange={(values) => {
              onChange({
                  target: {
                      name: props.name,
                      value: values.value
                  }
              });
          }}
      />
  );
});

const BackTesting = (props) => {
  const date = new Date().getFullYear();
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [money, setMoney] = useState();
  const [stocks, setStocks] = useState([]);
  const [selectStock, setSelectStock] = useState([]);
  const [percent, setPercent] = useState([]);
  const [count, setCount] = useState([0]);

  // 시작년도 
  const years = [];
    for(let i=1; i<11; i++){
        years.push(<MenuItem value = {date - i}>{date - i}</MenuItem>)
    }

  // 종료년도

  // 초기자금

  // 주식 선택
  let headers = new Headers({
    'Content-Type' : 'application/json'
  });

  const accessToken = sessionStorage.getItem("USER");
  if(accessToken && accessToken !== null){
      headers.append("Authorization", "Bearer " + accessToken);
  }

  useEffect(() => {
      const fetchStocks = async () => {
          await fetch(STOCK_URL, {headers: headers}).then((res) => {
              if(res.ok){
                  res.json().then((res2 => {
                      const stockData = [];
                      for(const key in res2){
                          stockData.push({
                              label: res2[key].name,
                              code: res2[key].code
                          });
                      }
                      setStocks(stockData);
                  }))
              }
          })
      }
      fetchStocks().catch(error => {
          console.log(error);
      })
  }, []);

  const startYearHandler = (e) => {
    setStartYear(e.target.value);
  }

  const endYearHandler = (e) => {
    setEndYear(e.target.value);
  }

  const moneyHandler = (e) => {
    setMoney(e.target.value);
  }

  const stockHandler = (e, newValue) => {
    let stockList = [...selectStock];
    stockList.push(newValue.code);
    setSelectStock(stockList);
    console.log(selectStock);
  }

  const percentHandler = (e, i) => {
    // let percentList = [...percent];
    // percentList.push(e.target.value);
    // setPercent(percentList);
    // console.log(percent);
    console.log(i);
    let percentList = [...percent];
    percentList[i] = e.target.value;
    setPercent(percentList);
  }

  const eventHandler = () => {
    console.log(selectStock);
    console.log(percent);
    const fetchBacktest = async() => {
      await fetch(BASE_URL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          startYear: startYear,
          endYear: endYear,
          codes: selectStock,
          deposit: money * 10000,
          percentage: percent
        })
      })
      .then((res) => {
        if(res.ok){
          console.log("ok");
          res.json().then((res2 =>{
            // 정보 출력
            const balances = [];
            const profits = [];

            for(const key in res2.balances){
              balances.push({
                date: res2.balances[key].date,
                balance: res2.balances[key].balance
              });
            }

            for(const key in res2.profits){
              profits.push({
                date: res2.profits[key].date,
                profit: res2.profits[key].profit
              })
            }

            props.onOpenBacktest(
              res2.startMoney,
              res2.endMoney,
              res2.cagr,
              res2.stdev,
              res2.bestYear,
              res2.worstYear,
              balances,
              profits
              );
          }))
        }else{
          console.log("Bad request");
        }
      })
    }
    fetchBacktest().catch(error => {
      console.log(error);
    })
  }

  const addComponent = () => {
    let countArr = [...count]
    let cnt = countArr.slice(-1)[0]
    cnt += 1
    countArr.push(cnt)
    setCount(countArr)
  }
  // 플러스 버튼

  return (
    <div className='classes.box'>
        {/* 시작년도 */}
        <FormControl fullWidth className='input'>
            <InputLabel id="demo-simple">시작일</InputLabel>
            <Select
                labelId="start"
                id="start"
                value={startYear}
                label="Date"
                onChange={startYearHandler}
            >
                {years}
            </Select>
        </FormControl>
        {/* 종료년도 */}
        <FormControl fullWidth className='classes.input'>
            <InputLabel id="demo-simple">종료일</InputLabel>
            <Select
                labelId="end"
                id="end"
                value={endYear}
                label="Date"
                onChange={endYearHandler}
            >
                {years}
            </Select>
        </FormControl>
        {/* <Rebalancing/> */}
        {/* 초기 자본 */}
        <FormControl fullWidth className='classes.input'>
            <TextField 
                id="outlined-basic" 
                label="시작 금액 (만 원)" 
                variant="outlined" 
                value={money}
                onChange={moneyHandler}
            />
        </FormControl>

        {count && count.map((item, i) => (
          <div key = {i}>
            {/* 주식 선택 */}
            <Autocomplete        
                disablePortal
                id="combo-box-search"
                options={stocks}
                sx={{ width: 0.9}}
                autoSelect={true}
                onChange={stockHandler}
                renderInput={(params) => <TextField {...params} placeholder="Search" variant='standard'
                className='classes.input'/> }
            />
            <TextField 
                id="outlined-basic" 
                label="구매 비율 (%)" 
                variant="outlined" 
                value={percent[i]}
                onChange={(e) => {percentHandler(e, i)}}
                className='classes.input'
            />
          </div>
        ))}

        {/* plus button */}
        <Button onClick={addComponent}>+</Button>
        <Button onClick={eventHandler}>백테스팅 시작</Button>
    </div>
  )
}

export default BackTesting