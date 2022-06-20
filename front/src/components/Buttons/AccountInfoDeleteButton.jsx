import React, { useState } from 'react'
import classes from './AccountInfoDeleteButton.module.css';
import { Box, Button } from '@mui/material';
import AccountInfoDeleteModal from '../Modal/AccountInfoDeleteModal';

const AccountInfoDeleteButton = (props) => {

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

export default AccountInfoDeleteButton