import React, { useState } from 'react';
import classes from './AccountInfoCreateButton.module.css';
import { Button, Box } from '@mui/material';
import AccountInfoCreateModal from '../Modal/AccountInfoCreateModal';



const AccountCreateButton = () => {

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const createModalOnClick = () => {
        setCreateModalOpen(true);
    };
    const createModalOnClose = () => {
        setCreateModalOpen(false)
    };

  return (
    <>
        <Box className={classes.box}>
            <Button 
                variant='contained'
                className='createAccountButton'
                onClick={createModalOnClick}
            >
                계좌 생성
            </Button>
        </Box>
        <AccountInfoCreateModal open={createModalOpen} onClose={createModalOnClose} />
    </>
  )
}

export default AccountCreateButton