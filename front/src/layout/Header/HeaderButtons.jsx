import React from 'react'
import classes from './HeaderButtons.module.css'
import MyPageOrMainButton from '../../components/Buttons/MyPageOrMainButton';
import LogoutButton from '../../components/Buttons/CustomerLogoutButton';
import LoginButton from '../../components/Buttons/CustomerLoginButton';

const HeaderButtons = () => {
  return (
    <>
        <div className={classes.header__buttons}>

            {/* 로그인 여부 확인 */}
            { (sessionStorage.getItem('USER') !== null) ? (
                <>
                    {/* 로그인이 된 경우 */}
                    <MyPageOrMainButton />
                    <LogoutButton />
                </>
            ) : (
                <>
                    {/* 로그인이 안된 경우 */}
                    <LoginButton />
                </>
            ) }
        </div>
    </>
  )
}

export default HeaderButtons