import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import classes from "./Header.module.css";
import Input from "../Commons/Input";

const BASE_URL = 'http://localhost:8090/login';

const Header = (props) => {

  const [user, setUser] = useState('null');

  // POST로 로그인 정보 전송 함수
  const loginHandler = async(userData) => {
    console.log(userData);
    console.log(JSON.stringify({
      userEmail: userData.email,
      userpassword: userData.password,
    }));

    await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        userEmail: userData.email,
        userPassword: userData.password,
      })
    })
  };

  // 로그인 버튼 클릭시 작동하는 함수
  const loginEmailInputRef = useRef();
  const loginPasswordInputRef = useRef();

  const loginButtonHandler = event => {
    event.preventDefault();

    const enteredLoginEmail = loginEmailInputRef.current.value;
    const enteredLoginPassword = loginPasswordInputRef.current.value;

    loginHandler({
      email: enteredLoginEmail,
      password: enteredLoginPassword,
    });
  }

  // POST로 회원가입 정보 전송 함수
  const signUpHandler = async(userData) => {
    console.log(userData);
    console.log(JSON.stringify({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    }));

    await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      })
    })
  };

  // 회원가입 버튼 클릭시 작동하는 함수
  const signUpUserNameInputRef = useRef();
  const signUpEmailInputRef = useRef();
  const signUpPasswordInputRef = useRef();

  const signUpButtonHandler = event => {
    event.preventDefault();

    const enteredSignUpUserName = signUpUserNameInputRef.current.value;
    const enteredSignUpEmail = signUpEmailInputRef.current.value;
    const enteredSignUpPassword = signUpPasswordInputRef.current.value;

    signUpHandler({
      name:enteredSignUpUserName ,
      email: enteredSignUpEmail,
      password: enteredSignUpPassword,
    });
  }

  return (
    <header className={classes.header}>
      <h1>STOCK SIMULATOR</h1> 
      {user ? (
        <Button className={classes.button} variant="outline-light" onClick={props.onOpen}>로그인</Button>
        ) : (
          <Button className={classes.button} variant="outline-light" onClick={() => setUser(null)}>로그아웃</Button>
      )}
      <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>STOCK SIMULATOR</Modal.Title>
      </Modal.Header>
      <Modal.Body className={classes.modal__body}>
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">

        <Tab eventKey="home" title="로그인" className={classes.tab}>
          <Input ref={loginEmailInputRef} label="이메일" input={{id:"email", type:"text"}} placeholder="이메일"/>
          <Input ref={loginPasswordInputRef} label="비밀번호" input={{id:"password", type:"password"}} placeholder="비밀번호"/>
          <Button className={classes.modal__body__button} type="submit" onClick={loginButtonHandler}>로그인</Button>
        </Tab>

        <Tab eventKey="profile" title="회원가입">
          <Input ref={signUpUserNameInputRef} label="이름" input={{id:"signup_name", type:"text"}} placeholder="이름"/>
          <Input ref={signUpEmailInputRef} label="이메일" input={{id:"signup_email", type:"text"}} placeholder="이메일"/>
          <Input ref={signUpPasswordInputRef} label="비밀번호" input={{id:"signup_password", type:"password"}} placeholder="비밀번호"/>
          <Button className={classes.modal__body__button} type='submit' onClick={signUpButtonHandler}>회원가입</Button>
        </Tab>

      </Tabs>
      </Modal.Body>
    </Modal>
    </header>
  )
}


export default Header;
