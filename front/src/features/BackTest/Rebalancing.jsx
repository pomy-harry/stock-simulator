import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Rebalancing = () => {
    const term = ['매년', '매분기', '매반기', '매달'];

    const terms = [];
    for(let i=0; i<4; i++){
        terms.push(<MenuItem value = {term[i]}>{term[i]}</MenuItem>)
    }

    const [rebalancing, setRebalancing] = React.useState('');

    const handleChange = (event) => {
        setRebalancing(event.target.value);
      };

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple">리밸런싱 주기</InputLabel>
            <Select
                labelId="rebalancing"
                id="rebalancing"
                value={rebalancing}
                label="Date"
                onChange={handleChange}
            >
                {terms}
            </Select>
        </FormControl>
    )
}

export default Rebalancing