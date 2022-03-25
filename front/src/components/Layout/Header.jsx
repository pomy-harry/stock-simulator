import React, { useState } from 'react';
import classes from "./Header.module.css";
import Button from 'react-bootstrap/Button'
import Modal from "react-bootstrap/Modal"
import { Input } from '@material-ui/core'

const Header = (props) => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <header className={classes.header}>
        <h1>STOCK SIMULATOR</h1> 
        <Button className={classes.button} variant="outline-light" onClick={props.onOpen}>로그인</Button>

        <Modal show={props.show} onHide={props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>로그인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          <Input
              placeholder="이메일"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input 
              placeholder="비밀번호"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit' variant="outline-dark" onClick={props.onClose}>
            로그인
          </Button>
        </Modal.Footer>
      </Modal>
    </header>
    
  )
}


export default Header;
