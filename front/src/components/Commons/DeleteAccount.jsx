import React from 'react'
import { Button } from '@mui/material';
import classes from './Account.module.css';

const BASE_URL = 'http://localhost:8090/info/account'

const DeleteAccount = (props) => {

    const clickDelHandler = async() => {
        await fetch(BASE_URL, {
            method: 'Delete',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                id: props.id
            })
        })

        console.log("삭제 complete");

        props.onClose();
    }  

  return (
    <div className={classes.main}>
        <p>{props.name} 계좌를 삭제하시겠습니까?</p>
        <div className={classes.bottom}>
            <Button onClick={clickDelHandler}>삭제</Button>
            <Button onClick={props.onClose}>취소</Button>
        </div>
    </div>
  )

}

export default DeleteAccount