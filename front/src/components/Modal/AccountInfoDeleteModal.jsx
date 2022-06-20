import React from 'react'
import classes from './AccountInfoDeleteModal.module.css';
import { Modal } from '@mui/material';
import AccountInfoDelete from '../AccountInfo/AccountInfoDelete';

const AccountInfoDeleteModal = (props) => {
  return (
    <Modal open={props.open} onClose={props.onClose}>
        <div className={classes.accountInfoDelete__modal}>
            <AccountInfoDelete id={props.id} name={props.name} onClose={props.onClose}/>
        </div>
    </Modal>
  )
}

export default AccountInfoDeleteModal