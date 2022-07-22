import React from 'react';
import "../../static/fonts/font.css"
import classes from "./Header.module.css";
import HeaderLogo from './HeaderLogo';
import HeaderButtons from './HeaderButtons';
import HelpButton from '../../components/Buttons/HelpButton';

const Header = (props) => {

  return (
    <header className={classes.header}>
      <div className={classes.header__border}>        
        <div className={classes.header__content}>
          <HeaderLogo/>
          <HelpButton/>
          <HeaderButtons/>
        </div>
      </div>
      
    </header>
  )
}

export default Header;
