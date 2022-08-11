import { TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import StockSearchInput from '../../components/Inputs/StockSearchInput'

const StockSetting = () => {
    const [money, setMoney] = useState();

    const handleChange = (event) => {
        setMoney(event.target.value);
      }

  return (
    <>
    {/* stock choice */}
    <StockSearchInput></StockSearchInput>
    {/* percent */}
    <TextField 
            id="outlined-basic" 
            label="시작 금액 (만 원)" 
            variant="outlined" 
            value={money}
            onChange={handleChange}
        />
    </>
  )
}

export default StockSetting