import React, { useRef } from 'react'
import classes from './CustomerUpdate.module.css';
import { Button, Input } from '@mui/material';

const BASE_URL = 'http://localhost:8090/info/customer'

const CustomerUpdate = (props) => {

    const updateCustomerName = useRef();

    const customerInfoUpdateHandler = (event) => {
        event.preventDefault();
        const name = updateCustomerName.current.value;
        updateCustomerInfo(name);
    }

    let headers = new Headers({
        'Content-Type' : 'application/json'
    });

    const accessToken = sessionStorage.getItem("USER");
    if(accessToken && accessToken !== null){
        headers.append("Authorization", "Bearer " + accessToken);
    }

    const updateCustomerInfo = async(updateName) => {
        await fetch(BASE_URL, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify({
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

export default CustomerUpdate