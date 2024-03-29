import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const EndYear = () => {
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
        <InputLabel id="demo-simple">종료일</InputLabel>
        <Select
            labelId="end"
            id="end"
            value={year}
            label="Date"
            onChange={handleChange}
        >
            {years}
        </Select>
    </FormControl>
  )
}

export default EndYear