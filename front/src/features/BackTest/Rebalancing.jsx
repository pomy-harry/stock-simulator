import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Rebalancing = () => {
    const terms = ['매년', '매분기', '매반기', '매달'];
    const months = [];
    for(let i=0; i<4; i++){
        months.push(<MenuItem value = {terms[i]}>{terms[i]}</MenuItem>)
    }

    const [month, setMonth] = React.useState('');

    const handleChange = (event) => {
        setMonth(event.target.value);
      };

  return (
    <FormControl fullWidth>
        <InputLabel id="demo-simple">리밸런싱 주기</InputLabel>
        <Select
            labelId="start"
            id="start"
            value={month}
            label="Date"
            onChange={handleChange}
        >
            {month}
        </Select>
    </FormControl>
  )
}

export default Rebalancing