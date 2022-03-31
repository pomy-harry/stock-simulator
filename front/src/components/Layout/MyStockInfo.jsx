import React, { useEffect, useState } from 'react'
import MyStock from './MyStock';

const BASE_URL = 'http://localhost:8090/my-stock'

const MyStockInfo = () => {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        const fetchStocks = async () => {
            await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    id: sessionStorage.getItem('USER')
                })
            }).then((res) => {
                if(res.ok){
                    const stockData = [];

                    for(const key in res){
                        stockData.push({
                            title : res[key].title,
                            buyPrice : res[key].buyPrice,
                            amount : res[key].amount,
                            totalPrice : res[key].totalPrice,
                            profitRate : res[key].profitRate,
                            profit : res[key].profit
                        });
                    }
                    setStocks(stockData);
                }
            })
        }

        fetchStocks().catch(error => {
            console.log(error);
        })
    }, []);

    const myStockList = stocks.map((stock) => (
        <MyStock 
            title={stock.title}
            buyPrice={stock.buyPrice}
            amount={stock.amount}
            totalPrice={stock.totalPrice}
            profitRate={stock.profitRate}
            profit={stock.profit}
        />
    ));


  return (
    <>
        <ul>{myStockList}</ul>
    </>
  )
}

export default MyStockInfo