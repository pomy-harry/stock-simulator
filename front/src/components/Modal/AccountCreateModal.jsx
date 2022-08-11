import React, { useState } from 'react';
import classes from './AccountCreateModal.module.css';
import { Modal } from '@mui/material';
import AccountCreate from '../../features/Account/AccountCreate';
 
const CREATE_ACCOUNT_URL = 'http://localhost:8090/account';

const AccountCreateModal = (props) => {
    
    const [accountName, setAccountName] = useState('');
    const [deposit, setDeposit] = useState('');

    let headers = new Headers({
        'Content-Type' : 'application/json'
    });

    const accessToken = sessionStorage.getItem("USER");
    if(accessToken && accessToken !== null){
        headers.append("Authorization", "Bearer " + accessToken);
    }
    
    const createAccount = async (event) => {
        event.preventDefault();

        await fetch (
            CREATE_ACCOUNT_URL,
            {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                name: accountName,
                deposit: deposit,
                seedMoney: deposit
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