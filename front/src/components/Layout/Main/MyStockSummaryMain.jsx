import React, { useEffect, useState } from 'react'
import classes from './MyStockSummaryMain.module.css'
import "../../../static/fonts/font.css"

const BASE_URL = 'http://localhost:8090/stocks/my-stock'

const MyStockSummaryMain = () => {
    const [sumTotalBuyPrice, setSumTotalBuyPrice] = useState(0);
    const [sumTotalNowPrice, setSumTotalNowPrice] = useState(0);

    useEffect(() => {
        const fetchStocks = async () => {
            await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    customerId: sessionStorage.getItem('USER')
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
                    }))
                }
            })
        }
        fetchStocks().catch(error => {
            console.log(error);
        })
    }, []);

  return (
    <div className={classes.box}>
        <div className={classes.summary}>
            <span>현재 수익률</span>
            <span className={(sumTotalNowPrice - sumTotalBuyPrice)>0 ? classes.rate__red : classes.rate__blue}>
                {sumTotalBuyPrice!==0? ((sumTotalNowPrice - sumTotalBuyPrice) / sumTotalBuyPrice * 100).toFixed(3) : 0} %
            </span>
            <span>{(sumTotalNowPrice - sumTotalBuyPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</span>
        </div>
    </div>
  )
}

export default MyStockSummaryMain