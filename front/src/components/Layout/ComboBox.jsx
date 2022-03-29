import * as React from 'react';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const BASE_URL = 'http://localhost:8090/stocks';

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
          sx={{ width: 600, heigth: '25%'}}
          renderInput={(params) => <TextField {...params} placeholder="Search" />}
        />
      );
}

export default StockList;
