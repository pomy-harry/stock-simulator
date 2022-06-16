import React, { useState } from 'react'
import classes from './LoginButton.module.css'
import { Button } from '@mui/material';
import LoginModal from '../Modal/LoginModal';

const LoginButton = () => {

    const [loginModalOpen, setLoginModalOpen] = useState(false);

    const loginModalOnClick = () => {
        setLoginModalOpen(true)
    };

    const loginModalOnClose = () => {
        setLoginModalOpen(false)
    };

  return (
    <>
        <Button className={classes.button} variant="outline-light" onClick={loginModalOnClick}>로그인</Button>
        <LoginModal open={loginModalOpen} onClose={loginModalOnClose}/>
    </>
  )
}

export default LoginButton