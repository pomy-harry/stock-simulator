import React from 'react'
import classes from './LoginModal.module.css'
import Modal from '@mui/material/Modal';
import logo_img from '../../static/images/logo1.png'
import LoginSingnUpTab from '../Tabs/LoginSingnUpTab';

const LoginModal = (props) => {

  return (
    <Modal open={props.open} onClose={props.onClose}>
        <div className={classes.login__modal}>

            <div className={classes.login__modal__header}>
                <img src={logo_img} alt="logo" />
                <h2>주린이집</h2>
            </div>

            <LoginSingnUpTab onClose={props.onClose}/>

        </div>        
    </Modal>
  )
}

export default LoginModal