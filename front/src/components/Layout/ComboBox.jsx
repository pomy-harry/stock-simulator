import * as React from 'react';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const BASE_URL = 'http://localhost:8090/stocks';
const STOCK_URL = 'http://localhost:8090/stocks/watch';

const StockList = () => {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        const fetchStocks = async () => {
            const response = await fetch(BASE_URL);

            const responseData = await response.json();

            const stockData = [];
            for(const key in responseData){
                stockData.push({
                    label: responseData[key].name,
                    code: responseData[key].code
                });
            }

            setStocks(stockData);
        }

        fetchStocks().catch(error => {
            console.log(error);
        })
    }, []);

    return (
        <Autocomplete
        disablePortal
        id="combo-box-search"
        options={stocks}
        sx={{ width: 1}}
        autoSelect={true}
        onChange={(event, newValue) => {
            const fetchWatchList = async () => {
                await fetch(STOCK_URL, {
                    method: 'POST',
                    headers: {
                    'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({
                        code: newValue.code,
                        customerId: sessionStorage.getItem('USER')
                    })
                })
                window.location.reload();
            }

            fetchWatchList().catch(error => {
                console.log(error);
            })
            console.log(newValue.code);
        }}
        renderInput={(params) => <TextField {...params} placeholder="Search" variant='standard'/> }
        />
      );
}

export default StockList;
