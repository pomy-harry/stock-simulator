import React from 'react'
import { useState } from 'react';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import UpdateAccount from './UpdateAccount';
import DeleteAccount from './DeleteAccount';

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
    <>
        <div>계좌정보</div>
        <div>
            <div>이름</div> 
            <div>{props.name}</div>
        </div>
        <div>
            <div>예수금</div>
            <div>{props.deposit}</div>
        </div>
        <div>
            <div>잔고</div>
            <div>{props.balance}</div>
        </div>
        <Button onClick={handleUpdateOpen}>수정</Button>
        <Modal open={update} onClose={handleUpdateClose}>
            <Box sx={style}>
                <UpdateAccount id={props.id} onClose={handleUpdateClose}></UpdateAccount>
            </Box>
        </Modal>
        <Button onClick={handleDelOpen}>삭제</Button>
        <Modal open={del} onClose={handleDelClose}>
            <Box sx={style}>
                <DeleteAccount id={props.id} name={props.name} onClose={handleDelClose}/>
            </Box>
        </Modal>
    </>
  )
}

export default ShowAccount