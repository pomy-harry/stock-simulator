import React from 'react'
import classes from './KakaoLoginButton.module.css'
import { Button } from '@mui/material';
import kakao_img from '../../static/images/kakao_login_small.png'
import { KAKAO_AUTH_URL } from '../../features/KakaoLogin/OAuth';

const KakaoLoginButton = () => {
  return (
    <div className={classes.login__button_sns}>
        <Button href={KAKAO_AUTH_URL}><img src={kakao_img} alt="kako_logo" /></Button>
    </div>
  )
}

export default KakaoLoginButton