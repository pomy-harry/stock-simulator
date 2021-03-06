import React, { useState } from 'react'
import classes from './AccountUpdateButton.module.css';
import { Box, Button } from '@mui/material';
import AccountInfoUpdateModal from '../Modal/AccountUpdateModal';

const AccountUpdateButton = (props) => {

    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    
    const updateModalOnClick = () => {
        setUpdateModalOpen(true);
    };

    const updateModalOnClose = () => {
        setUpdateModalOpen(false)
    };

  return (
    <>
        <Box className={classes.box}>
            <Button variant='contained' onClick={updateModalOnClick}>수정</Button>
        </Box>
        <AccountInfoUpdateModal open={updateModalOpen} onClose={updateModalOnClose} id={props.id}/>
    </>
  )
}

export default AccountUpdateButton