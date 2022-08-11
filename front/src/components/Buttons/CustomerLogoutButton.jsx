import React from 'react'
import classes from './CustomerLogoutButton.module.css'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const CustomerLogoutButton = () => {
  return (
    <Button className={classes.button} variant="outline-light" onClick={() => {
        sessionStorage.removeItem('USER');
        
        window.location.reload();
    }}>
        <Link to="/" className={classes.link}>로그아웃</Link>
    </Button>
  )
}

export default CustomerLogoutButton