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
        <div className={classes.bottom}>
            <Button onClick={clickDelHandler}>삭제</Button>
            <Button onClick={props.onClose}>취소</Button>
        </div>
    </div>
  )

}

export default DeleteAccount