import React, { useState } from 'react';
import classes from './AccountCreateButton.module.css';
import { Button, Box } from '@mui/material';
import AccountCreateModal from '../Modal/AccountCreateModal';



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
        <AccountCreateModal open={createModalOpen} onClose={createModalOnClose} />
    </>
  )
}

export default AccountCreateButton