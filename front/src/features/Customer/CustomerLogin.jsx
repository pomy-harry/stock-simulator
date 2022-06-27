import React, { useRef } from 'react'
import classes from './CustomerLogin.module.css'
import { Button, Input } from '@mui/material';

const LOGIN_URL = 'http://localhost:8090/auth/login';

const CustomerLogin = (props) => {

    const loginHandler = async(userData) => {        
        
        await fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                email: userData.email,
                password: userData.password,
            })
        }).then((res) => {
            if(res.ok){
                res.json().then((res2 => {
                    sessionStorage.setItem('USER', res2.token);
                    window.location.reload();
                }))
            } else {
                window.alert("로그인에 실패했습니다.\n로그인 정보를 확인해주세요");
            }
        });
    };

    const loginEmailInputRef = useRef();
    const loginPasswordInputRef = useRef();

    const loginButtonHandler = async(event) => {
        event.preventDefault();

        const enteredLoginEmail = loginEmailInputRef.current.value;
        const enteredLoginPassword = loginPasswordInputRef.current.value;

        await loginHandler({
            email: enteredLoginEmail,
            password: enteredLoginPassword,
        });

        props.onClose();
    
    };

  return (
    <form className={classes.form}>
        <Input inputRef={loginEmailInputRef} placeholder="이메일" type='text'/>
        <Input inputRef={loginPasswordInputRef} placeholder="비밀번호" type='password'/>
        <Button type="submit" onClick={loginButtonHandler}>로그인</Button>
    </form>
  )
}

export default CustomerLogin