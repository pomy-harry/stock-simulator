import React, { useState } from 'react'
import classes from './CustomerInfoDeleteButton.module.css';
import { Box, Button } from '@mui/material';
import CustomerDeleteModal from '../Modal/CustomerDeleteModal';

const CustomerInfoDeleteButton = (props) => {

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const deleteModalOnClick = () => {
        setDeleteModalOpen(true);
    }
    const deleteModalOnClose = () => {
        setDeleteModalOpen(false);
    }

  return (
    <>
        <Box className={classes.box}>
            <Button variant='outlined' onClick={deleteModalOnClick}>회원 탈퇴</Button>
        </Box>
        <CustomerDeleteModal open={deleteModalOpen} onClose={deleteModalOnClose} email={props.email} />
    </>
  )
}

export default CustomerInfoDeleteButton