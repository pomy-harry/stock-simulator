import React from 'react'
import "../../../static/fonts/font.css"
import classes from './HeaderLogo.module.css'
import { Link } from 'react-router-dom'
import logo_img from '../../../static/images/logo1.png'
import { Button } from '@mui/material'

const LogoLink = () => {
  return (
    <Button onClick={() => {window.location.reload();}}>
        <Link to="/" className={classes.link}>
            <div className={classes.link__logo}>
                <img src={logo_img} alt="logo" />
                <h2>주린이집</h2>
            </div>
        </Link>
    </Button>
  )
}

export default LogoLink