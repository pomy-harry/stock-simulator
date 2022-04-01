import React from 'react';
import "../../static/fonts/font.css"
import classes from "./Header.module.css";
import logo_img from '../../static/images/logo1.png'
import { Link } from 'react-router-dom';
import LoginButton from '../Commons/LoginButton';


const Header = (props) => {

  return (

    <header className={classes.header}>
      <div className={classes.header__border}>        
        <div className={classes.header__content}>

          <Link to="/" className={classes.link}>
            <div className={classes.header__logo}>
              <img src={logo_img} alt="logo" />
              <h2>주린이집</h2>     
            </div>
          </Link>

          <LoginButton onClick={props.onClick} open={props.open} onClose={props.onClose} />

        </div>
      </div>
      
    </header>
  )
}

export default Header;
