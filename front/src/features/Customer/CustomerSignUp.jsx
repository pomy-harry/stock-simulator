import React, { useRef } from 'react'
import classes from './CustomerSignUp.module.css'
import { Button, Input } from '@mui/material';

const SIGNUP_URL = 'http://localhost:8090/auth/join';

const CustomerSignUp = (props) => {
    
    const signUpHandler = async(userData) => {

        await fetch(SIGNUP_URL, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                name: userData.name,
                email: userData.email,
                password: userData.password,
            })
        }).then((res) => {
            if(!res.ok){
                window.alert("이미 가입된 이메일입니다.");
            }
        })
    };

    const signUpUserNameInputRef = useRef();
    const signUpEmailInputRef = useRef();
    const signUpPasswordInputRef = useRef();

    const signUpButtonHandler = async(event) => {
        event.preventDefault();

        const enteredSignUpUserName = signUpUserNameInputRef.current.value;
        const enteredSignUpEmail = signUpEmailInputRef.current.value;
        const enteredSignUpPassword = signUpPasswordInputRef.current.value;

        await signUpHandler({
            name:enteredSignUpUserName ,
            email: enteredSignUpEmail,
            password: enteredSignUpPassword,
        });

        props.onClose();
    }
  return (
    <form className={classes.form}>
        <Input inputRef={signUpUserNameInputRef} placeholder="이름" label="이름" type='text'/>
        <Input inputRef={signUpEmailInputRef} placeholder="이메일" type='text'/>
        <Input inputRef={signUpPasswordInputRef} placeholder="비밀번호" type='password'/>
        <Button type="submit" onClick={signUpButtonHandler}>회원가입</Button>
    </form>
  )
}

export default CustomerSignUp