import React, { useState } from 'react'
import classes from './AccountDeleteButton.module.css';
import { Box, Button } from '@mui/material';
import AccountInfoDeleteModal from '../Modal/AccountDeleteModal';

const AccountDeleteButton = (props) => {

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
            <Button variant='outlined' onClick={deleteModalOnClick}>삭제</Button>
        </Box>
        <AccountInfoDeleteModal open={deleteModalOpen} onClose={deleteModalOnClose} id={props.id} name={props.name} />
    </>
  )
}

export default AccountDeleteButton