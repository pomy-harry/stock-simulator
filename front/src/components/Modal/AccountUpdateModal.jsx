import React from 'react'
import classes from './AccountUpdateModal.module.css';
import { Modal } from '@mui/material';
import AccountUpdate from '../../lib/Account/AccountUpdate';

const AccountUpdateModal = (props) => {
  return (
    <>
        <Modal open={props.open} onClose={props.onClose}>
            <div className={classes.accountInfoUpdate__modal}>
                <AccountUpdate id={props.id} onClose={props.onClose} />
            </div>
        </Modal>
    </>
  )
}

export default AccountUpdateModal