import React from 'react'
import { Button } from '@mui/material';
import classes from './Customer.module.css';

const BASE_URL = 'http://localhost:8090/info/customer'

const DeleteCustomer = (props) => {

    const clickDelHandler = async() => {
        await fetch(BASE_URL, {
            method: 'Delete',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                id: sessionStorage.getItem('USER')
            })
        }).then((res) => {
            sessionStorage.removeItem('USER');
            window.location.reload();
        })

        console.log("삭제 complete");

        props.onClose();
    }  

  return (
    <div className={classes.main}>
        <p>{props.email} 계정을 삭제하시겠습니까?</p>
        <div className={classes.bottom}>
            <Button onClick={clickDelHandler}>회원 탈퇴</Button>
            <Button onClick={props.onClose}>취소</Button>
        </div>
    </div>
  )

}

export default DeleteCustomer