import React from 'react'
import classes from './CustomerInfoUpdateModal.module.css';
import Modal from '@mui/material/Modal';
import CustomerInfoUpdate from '../CustomerInfo/CustomerInfoUpdate';

const CustomerInfoUpdateModal = (props) => {
  return (
    <>
        <Modal open={props.open} onClose={props.onClose}>
            <div className={classes.customerInfoUpdate__modal}>
                <CustomerInfoUpdate id={sessionStorage.getItem('USER')} onClose={props.onClose} />
            </div>
        </Modal>
    </>
  )
}

export default CustomerInfoUpdateModal
