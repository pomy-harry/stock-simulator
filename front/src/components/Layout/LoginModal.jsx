import { Input } from '@material-ui/core'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from "react-bootstrap/Modal"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

const BASE_URL = 'http://localhost:8090/login';

const LoginModal = (props) => {

  //"YOON", "ABCD@1234", "1234!@#$"
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (

    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>STOCK SIMULATOR</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="home" title="로그인">
          <Input
            placeholder="이메일"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br/>

          <Input 
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br/>

          <Button type='submit' variant="outline-dark" onClick={props.onClose}>
            로그인
          </Button>
        </Tab>

        <Tab eventKey="profile" title="회원가입">
          <div>
            <Input
              placeholder="닉네임"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            /><br/>
            <Input
              placeholder="이메일"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /><br/>
            <Input 
              placeholder="비밀번호"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type='submit' variant="outline-dark" onClick={props.onClose}>
            회원가입
          </Button>
        </Tab>
        <Modal.Footer>
          <Button type='submit' variant="outline-dark" onClick={props.onClose}>
            로그인
          </Button>
        </Modal.Footer>
      </Tabs>
      </Modal.Body>
    </Modal>
  )
}

export default LoginModal