import React, { useRef } from 'react'
import classes from './CustomerInfoUpdate.module.css';
import { Button, Input } from '@mui/material';

const BASE_URL = 'http://localhost:8090/info/customer'

const CustomerInfoUpdate = (props) => {

    const updateCustomerName = useRef();

    const customerInfoUpdateHandler = (event) => {
        event.preventDefault();
        const name = updateCustomerName.current.value;
        updateCustomerInfo(name);
    }

    const updateCustomerInfo = async(updateName) => {
        await fetch(BASE_URL, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                id: sessionStorage.getItem('USER'),
                name: updateName
            })
        })
        window.location.reload();
        props.onClose();
    }

  return (
    <div className={classes.main}>
        <p>회원 이름 수정</p>
        <Input className={classes.header} inputRef={updateCustomerName} placeholder="이름" type="text" />
        <div className={classes.button}>
            <Button onClick={customerInfoUpdateHandler}>수정</Button>
            <Button onClick={props.onClose}>취소</Button>
        </div>
    </div>
  )
}

export default CustomerInfoUpdate