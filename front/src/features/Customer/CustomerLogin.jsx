import React, { useRef, useState } from 'react'
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
    
    const [emailMsg, setEmailMsg] = useState("");
    const [pwMsg, setPwMsg] = useState("");

    const loginButtonHandler = async(event) => {
        event.preventDefault();

        const enteredLoginEmail = loginEmailInputRef.current.value;
        const enteredLoginPassword = loginPasswordInputRef.current.value;
        const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

        setEmailMsg("");
        setPwMsg("");
        
        if(enteredLoginEmail === ""){
            setEmailMsg("필수 입력 정보입니다.");
            return;
        }else if(emailRegex.test(enteredLoginEmail) === false){
            setEmailMsg("유효하지 않은 이메일 형식입니다.");
            return;
        }

        if(enteredLoginPassword === ""){
            setPwMsg("필수 입력 정보입니다.");
            return;
        }

        await loginHandler({
            email: enteredLoginEmail,
            password: enteredLoginPassword,
        });

        props.onClose();
        
    };

    const textStyle = {
        color: "red",
        fontSize: "0.8rem"
    };
    
  return (
    <form className={classes.form}>
        <Input inputRef={loginEmailInputRef} placeholder="이메일" type='text'/>
        {(emailMsg != "")?(<span style={textStyle}>{emailMsg}</span>):null}
        <Input inputRef={loginPasswordInputRef} placeholder="비밀번호" type='password'/>
        {(pwMsg != "")?(<span style={textStyle}>{pwMsg}</span>):null}
        <Button type="submit" onClick={loginButtonHandler}>로그인</Button>
    </form>
  )
}

export default CustomerLogin