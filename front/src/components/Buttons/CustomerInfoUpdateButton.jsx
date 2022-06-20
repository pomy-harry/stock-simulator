import React, { useState } from 'react'
import classes from './CustomerInfoUpdateButton.module.css';
import { Box, Button } from '@mui/material';
import CustomerInfoUpdateModal from '../Modal/CustomerInfoUpdateModal';

const CustomerInfoUpdateButton = () => {    

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
        <CustomerInfoUpdateModal open={updateModalOpen} onClose={updateModalOnClose} />
    </>
  )
}

export default CustomerInfoUpdateButton