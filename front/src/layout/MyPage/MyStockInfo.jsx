import React, { useEffect, useState } from 'react'
import classes from './MyStockInfo.module.css'
import "../../static/fonts/font.css"
import MyStockInfoSummaryMyPage from './MyStockInfoSummaryMyPage';
import MyStockInfoDetail from './MyStockInfoDetail';

const BASE_URL = 'http://localhost:8090/stocks/my-stock'

const MyStockInfo = () => {

    const [sumTotalBuyPrice, setSumTotalBuyPrice] = useState(0);
    const [sumTotalNowPrice, setSumTotalNowPrice] = useState(0);
    const [myStockData, setMyStockData] = useState([]);

    let headers = new Headers({
        'Content-Type' : 'application/json'
    });

    const accessToken = sessionStorage.getItem("USER");
    if(accessToken && accessToken !== null){
        headers.append("Authorization", "Bearer " + accessToken);
    }

    useEffect(() => {
        const fetchStocks = async () => {
            await fetch(BASE_URL, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    customerId: ''
                })
            }).then((res) => {
                if(res.ok){
                    res.json().then((res2 => {
                        const stockData = [];
                        let calTotalBuyPrice = 0;
                        let calTotalNowPrice = 0;   

                        for(const key in res2){
                            stockData.push({
                                name : res2[key].name,
                                totalBuyPrice : res2[key].totalBuyPrice,
                                amount : res2[key].amount,
                                totalNowPrice: res2[key].nowPrice*res2[key].amount
                            });

                            calTotalBuyPrice = calTotalBuyPrice + res2[key].totalBuyPrice;
                            calTotalNowPrice = calTotalNowPrice + res2[key].nowPrice * res2[key].amount;
                        }
                        setSumTotalBuyPrice(calTotalBuyPrice);
                        setSumTotalNowPrice(calTotalNowPrice);
                        setMyStockData(stockData);
                    }))
                }
            })
        }

        fetchStocks().catch(error => {
            console.log(error);
        })
    }, []);

  return (
    <div className={classes.myStockInfo}>
        <p>주식 정보</p>
        <MyStockInfoSummaryMyPage sumTotalBuyPrice={sumTotalBuyPrice} sumTotalNowPrice={sumTotalNowPrice} />
        <MyStockInfoDetail myStockData={myStockData} />
    </div>
  )
}

export default MyStockInfo