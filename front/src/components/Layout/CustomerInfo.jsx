import React from 'react'
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import classes from './Info.module.css';
import UpdateCustomer from './UpdateCustomer';
import DeleteCustomer from './DeleteCustomer';
import { useNavigate } from 'react-router';

const BASE_URL = 'http://localhost:8090/info/customer';

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

const CustomerInfo = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [update, setUpdate] = useState(false);
    const [del, setDel] = useState(false);

    const handleUpdateOpen = () => setUpdate(true);
    const handleUpdateClose = () => setUpdate(false);
    const handleDelOpen = () => setDel(true);
    const handleDelClose = () => setDel(false);

    useEffect(() => {
        const fetchCustomerInfo = async () => {
            if(sessionStorage.getItem('USER') !== null){
                await fetch(BASE_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({
                        id: sessionStorage.getItem('USER')
                    })
                }).then((res) => {
                    if(res.ok){
                        res.json().then((res2 => {
                            console.log(res2.name);
                            setName(res2.name);
                            setEmail(res2.email);
                        }))
                    }
                })
            }else{
                navigate("/");
            }

        }

        fetchCustomerInfo().catch(error => {
            console.log(error);
        })
    }, []);

    return (
        <div className={classes.main}>
            <div className={classes.title}>고객정보</div>
            <div className={classes.row}> 
                <p>이름</p> 
                <p>{name}</p>
            </div>
            <div className={classes.row}>
                <p>이메일</p>
                <p>{email}</p>
            </div>
            <div className={classes.bottom}>
                <Button onClick={handleUpdateOpen}>수정</Button>
                <Modal open={update} onClose={handleUpdateClose}>
                    <Box sx={style}>
                        <UpdateCustomer id={sessionStorage.getItem('USER')} onClose={handleUpdateClose} />
                    </Box>
                </Modal>
                <Button onClick={handleDelOpen}>회원 탈퇴</Button>
                <Modal open={del} onClose={handleDelClose}>
                    <Box sx={style}>
                        <DeleteCustomer email={email} onClose={handleDelClose}/>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}

export default CustomerInfo