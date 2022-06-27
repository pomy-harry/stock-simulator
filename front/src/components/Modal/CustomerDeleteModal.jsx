import React from 'react'
import classes from './CustomerDeleteModal.module.css';
import { Modal } from '@mui/material';
import CustomerDelete from '../../features/Customer/CustomerDelete';

const CustomerDeleteModal = (props) => {
  return (
    <Modal open={props.open} onClose={props.onClose}>
        <div className={classes.customerInfoDelete__modal}>
            <CustomerDelete email={props.email} onClose={props.onClose} />
        </div>
    </Modal>
  )
}

export default CustomerDeleteModal