import React from 'react'
import classes from './KakaoJoinButton.module.css'
import { Button } from '@mui/material';
import kakao_img from '../../static/images/kakao_login_medium_narrow.png'

const CLIENT_ID  = "ef23cfa2f66fcc25924f54647f3f5460";
const REDIRECT_URI =  "http://localhost:8090/kakaojoin";
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;


const KakaoJoinButton = () => {
  return (
    <div className={classes.login__button_sns}>
        <Button href={KAKAO_AUTH_URL}><img src={kakao_img} alt="kako_logo" /></Button>
    </div>
  )
}

export default KakaoJoinButton