import React, { forwardRef, useState } from 'react'
import { InputLabel, TextField, FormControl } from '@mui/material';
import NumberFormat from 'react-number-format';

const NumberFormatCustom = forwardRef((props, ref) => {
  const { onChange, ...other } = props;

  return (
      <NumberFormat
          {...other}
          customInput={TextField}
          thousandSeparator
          isNumericString
          suffix=" 원"
          type="text"
          onValueChange={(values) => {
              onChange({
                  target: {
                      name: props.name,
                      value: values.value
                  }
              });
          }}
      />
  );
});

const Seed = () => {
  const [money, setMoney] = useState();

  const handleChange = (event) => {
    setMoney(event.target.value);
  }

  return (
    <FormControl fullWidth>
        <TextField 
            id="outlined-basic" 
            label="시작 금액 (만 원)" 
            variant="outlined" 
            value={money}
            onChange={handleChange}
        />
    </FormControl>
    
  )
}

export default Seed