import React from 'react'
import classes from './AccountInfoUpdateModal.module.css';
import { Modal } from '@mui/material';
import AccountInfoUpdate from '../AccountInfo/AccountInfoUpdate';

const AccountInfoUpdateModal = (props) => {
  return (
    <>
        <Modal open={props.open} onClose={props.onClose}>
            <div className={classes.accountInfoUpdate__modal}>
                <AccountInfoUpdate id={props.id} onClose={props.onClose} />
            </div>
        </Modal>
    </>
  )
}

export default AccountInfoUpdateModal