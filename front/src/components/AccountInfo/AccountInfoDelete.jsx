import React from 'react'
import classes from './AccountInfoDelete.module.css';
import { Button } from '@mui/material';

const BASE_URL = 'http://localhost:8090/info/account'

const AccountInfoDelete = (props) => {

    const accountInfoDeleteHandler = async() => {
        await fetch(BASE_URL, {
            method: 'Delete',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                id: props.id,
                customerId: sessionStorage.getItem('USER')
            })
        }).then((res) => {
            if(res.ok){
                console.log("삭제 complete");
                window.location.reload();
            }else{
                window.alert("삭제에 실패했습니다. 다시 시도해주세요");
            }
        })
        props.onClose();
    }  

  return (
    <div className={classes.main}>
        <p>{props.name} 계좌를 삭제하시겠습니까?</p>
        <div className={classes.button}>
            <Button onClick={accountInfoDeleteHandler}>삭제</Button>
            <Button onClick={props.onClose}>취소</Button>
        </div>
    </div>
  )
}

export default AccountInfoDelete