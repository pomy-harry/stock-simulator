import React from 'react'
import classes from './MyPageOrMainButton.module.css'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const MyPageOrMainButton = () => {

  return (

    <Button className={classes.button} variant="outline-light" onClick={() => {
        window.location.reload();
    }}>

        {(window.location.pathname === '/') ? (
            <Link to="/MyPage" className={classes.link}>마이페이지</Link>
        ) : (
            <Link to="/" className={classes.link}>홈으로</Link>
        )}

    </Button>
  )
}

export default MyPageOrMainButton