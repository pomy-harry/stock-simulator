import React, { useState } from 'react';
import classes from './AccountCreateModal.module.css';
import { Modal } from '@mui/material';
import AccountCreate from '../../features/Account/AccountCreate';
 
const CREATE_ACCOUNT_URL = 'http://localhost:8090/account';

const AccountCreateModal = (props) => {
    
    const [accountName, setAccountName] = useState('');
    const [deposit, setDeposit] = useState('');
    
    const createAccount = async (event) => {
        event.preventDefault();

        await fetch (
            CREATE_ACCOUNT_URL,
            {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                name: accountName,
                deposit: deposit,
                seedMoney: deposit,
                customerId: sessionStorage.getItem('USER')
            })
            }
        )
        props.onClose();
        setAccountName('');
        setDeposit('');      
        window.location.reload();
    };

  return (
    <>
        <Modal
            open={props.open}
            onClose={() => {
                setAccountName('')
                setDeposit('')
                props.onClose()
            }}
        >
            <div className={classes.accountInfocreate__modal}>
                <AccountCreate 
                    onClose={props.onClose}
                    createAccount={createAccount}
                    accountName={accountName}
                    setAccountName={setAccountName}
                    deposit={deposit}
                    setDeposit={setDeposit} 
                />            
            </div>
        </Modal>
    </>
  )
}

export default AccountCreateModal