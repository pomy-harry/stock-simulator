import React from 'react'
import classes from './CustomerInfoDeleteModal.module.css';
import { Modal } from '@mui/material';
import CustomerInfoDelete from '../CustomerInfo/CustomerInfoDelete';

const CustomerInfoDeleteModal = (props) => {
  return (
    <Modal open={props.open} onClose={props.onClose}>
        <div className={classes.customerInfoDelete__modal}>
            <CustomerInfoDelete email={props.email} onClose={props.onClose} />
        </div>
    </Modal>
  )
}

export default CustomerInfoDeleteModal