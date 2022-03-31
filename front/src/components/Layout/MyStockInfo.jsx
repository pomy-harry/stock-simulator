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
                    customerId: sessionStorage.getItem('USER')
                })
            }).then((res) => {
                if(res.ok){
                    res.json().then((res2 => {
                        const stockData = [];


                        for(const key in res2){
                            stockData.push({
                                name : res2[key].name,
                                buyPrice : res2[key].buyPrice,
                                amount : res2[key].amount,
                                price: res2[key].price
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

    const myStockList = stocks.map((stock) => (
        <MyStock 
            name={stock.name}
            buyPrice={stock.buyPrice}
            amount={stock.amount}
            price={stock.price}
        />
    ));

  return (
    <>
        <ul>{myStockList}</ul>
    </>
  )
}

export default MyStockInfo