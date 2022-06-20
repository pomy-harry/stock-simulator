import React, { forwardRef } from 'react'
import classes from './AccountCreate.module.css';
import { Button, Input } from '@mui/material';
import NumberFormat from 'react-number-format';

// --- 기존의 Input 형식의 변경없이 숫자 형식 변경 ( ex) 1000 -> ￦1,000 ) ---
const NumberFormatCustom = forwardRef((props, ref) => {

    const { onChange, ...other } = props;
  
    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            thousandSeparator
            isNumericString
            prefix="￦"
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
// ----------------------------------------------------------------------



const AccountCreate = (props) => {

  return (
    <>
        <div className={classes.header}>
            모의투자 계좌 생성
        </div>
        <form className={classes.form}>
            <Input
                placeholder='계좌 이름 (별명)'
                type='text'
                value={props.accountName}
                onChange={(e) => {props.setAccountName(e.target.value)}}
            />
            <Input
                placeholder='예산 (원)'
                inputComponent={NumberFormatCustom}
                value={props.deposit.numberformat}
                onChange={(e) => {props.setDeposit(e.target.value)}}              
            />
            <Button type='submit' onClick={props.createAccount}>계좌 생성</Button>
        </form>
    </>
  )
}

export default AccountCreate