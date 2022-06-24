import React from 'react'
import { useState } from 'react';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import UpdateAccount from './UpdateAccount';
import DeleteAccount from './DeleteAccount';
import classes from '../Layout/Info.module.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0.25px solid #000',
    boxShadow: '5px',
    p: 4,
  };

const ShowAccount = (props) => {
    const [update, setUpdate] = useState(false);
    const [del, setDel] = useState(false);

    const handleUpdateOpen = () => setUpdate(true);
    const handleUpdateClose = () => setUpdate(false);
    const handleDelOpen = () => setDel(true);
    const handleDelClose = () => setDel(false);

  return (
    <div className={classes.main}>
        <div className={classes.title}> 계좌정보</div>
        <div className={classes.row}>
            <p>이름</p> 
            <p>{props.name}</p>
        </div>
        <div className={classes.row}>
            <p>예수금</p>
            <p>{props.deposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</p>
        </div>
        <div className={classes.row}> 
            <p>잔고</p>
            <p>{props.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') } 원</p>
        </div>
        <div className={classes.bottom}>
            <Box m ={2}>
                <Button variant='contained' onClick={handleUpdateOpen}>수정</Button>
            </Box>
            <Modal open={update} onClose={handleUpdateClose}>
                <Box sx={style}>
                    <UpdateAccount id={props.id} onClose={handleUpdateClose}></UpdateAccount>
                </Box>
            </Modal>
            <Box m={2}>
                <Button variant='outlined' onClick={handleDelOpen}>삭제</Button>
            </Box>
            <Modal open={del} onClose={handleDelClose}>
                <Box sx={style}>
                    <DeleteAccount id={props.id} name={props.name} onClose={handleDelClose}/>
                </Box>
            </Modal>
        </div>
    </div>
  )
}

export default ShowAccount