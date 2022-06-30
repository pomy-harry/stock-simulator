import React, { useRef, useState } from 'react'
import classes from './CustomerSignUp.module.css'
import { Button, Input, TextField } from '@mui/material';

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
            if(res.ok){
                res.json().then((res2 => {
                    sessionStorage.setItem('USER', res2.token);
                    window.location.reload();
                }))
            }else{
                window.alert("이미 가입된 이메일입니다.");
            }
        })
    };

    const signUpUserNameInputRef = useRef();
    const signUpEmailInputRef = useRef();
    const signUpPasswordInputRef = useRef();
    const signUpPasswordCheckInputRef = useRef();

    const [nameMsg, setNameMsg] = useState("");
    const [emailMsg, setEmailMsg] = useState("");
    const [pwMsg, setPwMsg] = useState("");
    const [pwcMsg, setPwcMsg] = useState("");

    const signUpButtonHandler = async(event) => {
        event.preventDefault();

        const enteredSignUpUserName = signUpUserNameInputRef.current.value;
        const enteredSignUpEmail = signUpEmailInputRef.current.value;
        const enteredSignUpPassword = signUpPasswordInputRef.current.value;
        const enteredSignUpPasswordCheck = signUpPasswordCheckInputRef.current.value;
        const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        const pwRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;

        setNameMsg("");
        setEmailMsg("");
        setPwMsg("");
        setPwcMsg("");

        if(enteredSignUpUserName === ""){
            setNameMsg("필수 입력 정보입니다.");
            return;
        }

        if(enteredSignUpEmail === ""){
            setEmailMsg("필수 입력 정보입니다.");
            return;
        }else if(emailRegex.test(enteredSignUpEmail) === false){
            setEmailMsg("유효하지 않은 이메일 형식입니다.");
            return;
        }

        if(enteredSignUpPassword === ""){
            setPwMsg("필수 입력 정보입니다.");
            return;
        }else if(pwRegex.test(enteredSignUpPassword) === false){
            setPwMsg("조건에 맞게 입력하세요.");
            setEmailMsg("")
        }

        if(enteredSignUpPasswordCheck === ""){
            setPwcMsg("필수 입력 정보입니다.");
            return;
        }else if(enteredSignUpPassword != enteredSignUpPasswordCheck){
            setPwcMsg("비밀번호가 일치하지 않습니다.");
            return;
        }


        await signUpHandler({
            name:enteredSignUpUserName ,
            email: enteredSignUpEmail,
            password: enteredSignUpPassword,
        });

        props.onClose();
        
    }

    const textStyle = {
        color: "red",
        fontSize: "0.8rem"
    };

    const pwTextStyle = {
        color: "lightgray",
        fontSize: "0.8rem"
    }

  return (
    <form className={classes.form}>
        <Input inputRef={signUpUserNameInputRef} placeholder="이름" label="이름" type='text'/>
        {(nameMsg != "")?(<span style={textStyle}>{nameMsg}</span>):null}
        <Input inputRef={signUpEmailInputRef} placeholder="이메일" type='text'/>
        {(emailMsg != "")?(<span style={textStyle}>{emailMsg}</span>):null}
        <Input inputRef={signUpPasswordInputRef} placeholder="비밀번호" type='password'/>
        <span style={pwTextStyle}>영문, 숫자 조합 8~10 자리</span>
        {(pwMsg != "")?(<span style={textStyle}>{pwMsg}</span>):null}
        <Input inputRef={signUpPasswordCheckInputRef} placeholder="비밀번호 확인" type='password'/>
        {(pwcMsg != "")?(<span style={textStyle}>{pwcMsg}</span>):null}
        <Button type="submit" onClick={signUpButtonHandler}>회원가입</Button>
    </form>
  )
}

export default CustomerSignUp