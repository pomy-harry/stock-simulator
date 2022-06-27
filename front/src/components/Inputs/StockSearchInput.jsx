import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const BASE_URL = 'http://localhost:8090/stocks';
const STOCK_URL = 'http://localhost:8090/stocks/watch';

const StockSearchInput = () => {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        const fetchStocks = async () => {
            await fetch(BASE_URL).then((res) => {
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

    const autocompleteHandler = (event, newValue) => {
        const fetchWatchList = async() => {
            await fetch(STOCK_URL, {
                method: 'POST',
                headers: {
                'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    code: newValue.code,
                    customerId: sessionStorage.getItem('USER')
                })
            }).then((res) => {
                if(res.ok){
                    res.json().then((res2 => {
                        console.log(res2);
                    }))
                    window.location.reload();
                }else{
                    res.json().then((res2 => {
                        if(res2.message === null){
                            window.alert("로그인을 해주세요.");
                        }else{
                            window.alert("이미 등록된 관심종목입니다.");
                        }
                    }))
                }
            })
        }
        fetchWatchList().catch(error => {
            console.log(error);
        })
    }


  return (    
    <Autocomplete        
        disablePortal
        id="combo-box-search"
        options={stocks}
        sx={{ width: 0.9}}
        autoSelect={true}
        onChange={autocompleteHandler}
        renderInput={(params) => <TextField {...params} placeholder="Search" variant='standard'/> }
    />
  )
}

export default StockSearchInput