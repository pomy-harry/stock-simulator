import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const StartYear = () => {
    const date = new Date().getFullYear();

    const years = [];
    for(let i=1; i<11; i++){
        years.push(<MenuItem value = {date - i}>{date - i}</MenuItem>)
    }

    const [year, setYear] = React.useState('');

    const handleChange = (event) => {
        setYear(event.target.value);
      };

  return (
    <FormControl fullWidth>
        <InputLabel id="demo-simple">시작일</InputLabel>
        <Select
            labelId="start"
            id="start"
            value={year}
            label="Date"
            onChange={handleChange}
        >
            {years}
        </Select>
    </FormControl>
  )
}

export default StartYear