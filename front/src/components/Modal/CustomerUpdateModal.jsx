import React from 'react'
import classes from './CustomerUpdateModal.module.css';
import Modal from '@mui/material/Modal';
import CustomerUpdate from '../../lib/Customer/CustomerUpdate';

const CustomerUpdateModal = (props) => {
  return (
    <>
        <Modal open={props.open} onClose={props.onClose}>
            <div className={classes.customerInfoUpdate__modal}>
                <CustomerUpdate id={sessionStorage.getItem('USER')} onClose={props.onClose} />
            </div>
        </Modal>
    </>
  )
}

export default CustomerUpdateModal
