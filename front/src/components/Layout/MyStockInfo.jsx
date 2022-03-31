import React, { useEffect, useState } from 'react'
import MyStock from './MyStock';
import classes from './MyStockInfo.module.css'

const BASE_URL = 'http://localhost:8090/my-stock'

const MyStockInfo = (props) => {
    const [stocks, setStocks] = useState([]);
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
                                // totalBuyPrice : 한 종목을 총 얼마에 샀는가(누적되어있음)?
                                // nowPrice : 한종목의 한주당 가격
                                // totalNowPrice : 해당 종목의 보유 총액
                            });

                            calTotalBuyPrice = calTotalBuyPrice + res2[key].totalBuyPrice;
                            calTotalNowPrice = calTotalNowPrice + res2[key].nowPrice * res2[key].amount;
                        }
                        setStocks(stockData);
                        setSumTotalBuyPrice(calTotalBuyPrice);
                        setSumTotalNowPrice(calTotalNowPrice);
                        // sumTotalBuyPrice : 보유한 모든 종목의 투자 금액
                        // sumTotalNowPrice : 보유한 모든 종목의 총액
                    }))
                }
            })
        }

        fetchStocks().catch(error => {
            console.log(error);
        })
    }, []);

    const myStockList = stocks.map((stock) => (
        <MyStock 
            name={stock.name}
            totalBuyPrice={stock.totalBuyPrice}
            amount={stock.amount}
            totalNowPrice={stock.totalNowPrice}
        />
    ));

    if(!props.main){
        return (
            <div className={classes.box}>
                <div className={classes.profit}>
                    <span>현재 수익률</span>
                    <span className={(sumTotalNowPrice - sumTotalBuyPrice)>0 ? classes.red : classes.blue}>{sumTotalBuyPrice!==0? ((sumTotalNowPrice - sumTotalBuyPrice) / sumTotalBuyPrice * 100).toFixed(3) : 0}%</span>
                    <span>{(sumTotalNowPrice - sumTotalBuyPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</span>
                </div>
                <div className={classes.profit__box}>
                    <ul>{myStockList}</ul>
                </div> 
            </div>
          )
    }else{
        return(
            <div className={classes.profit__main}>
                <span>현재 수익률</span>
                <span className={(sumTotalNowPrice - sumTotalBuyPrice)>0 ? classes.red : classes.blue}>{((sumTotalNowPrice - sumTotalBuyPrice) / sumTotalBuyPrice * 100).toFixed(3)} %</span>
                <span>{(sumTotalNowPrice - sumTotalBuyPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</span>
            </div>
        )
    }
  
}

export default MyStockInfo