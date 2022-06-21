import React from 'react'
import classes from './AccountDeleteModal.module.css';
import { Modal } from '@mui/material';
import AccountDelete from '../../features/Account/AccountDelete';

const AccountDeleteModal = (props) => {
  return (
    <Modal open={props.open} onClose={props.onClose}>
        <div className={classes.accountInfoDelete__modal}>
            <AccountDelete id={props.id} name={props.name} onClose={props.onClose}/>
        </div>
    </Modal>
  )
}

export default AccountDeleteModal