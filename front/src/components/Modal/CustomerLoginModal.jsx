import React from 'react'
import classes from './CustomerLoginModal.module.css'
import Modal from '@mui/material/Modal';
import logo_img from '../../static/images/logo1.png'
import CustomerLoginSingnUpTab from '../Tabs/CustomerLoginSingnUpTab';

const CustomerLoginModal = (props) => {

  return (
    <Modal open={props.open} onClose={props.onClose}>
        <div className={classes.login__modal}>

            <div className={classes.login__modal__header}>
                <img src={logo_img} alt="logo" />
                <h2>주린이집</h2>
            </div>
          
            <CustomerLoginSingnUpTab onClose={props.onClose}/>

        </div>        
    </Modal>
  )
}

export default CustomerLoginModal