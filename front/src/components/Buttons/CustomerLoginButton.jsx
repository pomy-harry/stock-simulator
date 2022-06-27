import React, { useState } from 'react'
import classes from './CustomerLoginButton.module.css'
import { Button } from '@mui/material';
import CustomerLoginModal from '../Modal/CustomerLoginModal';

const CustomerLoginButton = () => {

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
        <CustomerLoginModal open={loginModalOpen} onClose={loginModalOnClose}/>
    </>
  )
}

export default CustomerLoginButton