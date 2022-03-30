import React from 'react'
import { useRef } from 'react';
import { Button, Input } from '@mui/material';
import classes from './Customer.module.css';

const BASE_URL = 'http://localhost:8090/info/customer'

const UpdateCustomer = (props) => {
    const updateCustomerName = useRef();

    const clickUpdateHandler = (event) => {
        event.preventDefault();

        const name = updateCustomerName.current.value;

        updateCustomerHandler(name);
    }

    const updateCustomerHandler = async(updateName) => {
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
        <div className={classes.bottom}>
            <Button onClick={clickUpdateHandler}>수정</Button>
            <Button onClick={props.onClose}>취소</Button>
        </div>
    </div>
  )
}

export default UpdateCustomer