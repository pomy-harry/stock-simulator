import React, { useEffect, useState } from 'react'
import MyStock from './MyStock';
import classes from './MyStockInfo.module.css'

const BASE_URL = 'http://localhost:8090/my-stock'

const MyStockInfo = (props) => {
    const [stocks, setStocks] = useState([]);
    const [buyPrice, setBuyPrice] = useState(0);
    const [price, setPrice] = useState(0);

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
                        let p = 0;
                        let p2 = 0;   

                        for(const key in res2){
                            stockData.push({
                                name : res2[key].name,
                                buyPrice : res2[key].buyPrice,
                                amount : res2[key].amount,
                                price: res2[key].price
                            });

                            p = p + res2[key].buyPrice * res2[key].amount;
                            p2 = p2 + res2[key].price * res2[key].amount;
                        }
                        setStocks(stockData);
                        setBuyPrice(p);
                        setPrice(p2);
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

    if(!props.main){
        return (
            <div className={classes.box}>
                <div className={classes.profit}>
                    <span>현재 수익률</span>
                    <span className={(price - buyPrice)>0 ? classes.red : classes.blue}>{((price - buyPrice) / buyPrice * 100).toFixed(3)}%</span>
                    <span>{(price - buyPrice)}원</span>
                </div>
                <div>
                    <ul>{myStockList}</ul>
                </div> 
            </div>
          )
    }else{
        return(
            <div className={classes.profit__main}>
                <span>현재 수익률</span>
                <span className={(price - buyPrice)>0 ? classes.red : classes.blue}>{((price - buyPrice) / buyPrice * 100).toFixed(3)}%</span>
                <span>{(price - buyPrice)}원</span>
            </div>
        )
    }
  
}

export default MyStockInfo