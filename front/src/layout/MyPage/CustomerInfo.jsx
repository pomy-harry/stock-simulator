import React, { useEffect, useState } from 'react'
import classes from './CustomerInfo.module.css';
import { useNavigate } from 'react-router';
import CustomerInfoUpdateButton from '../../components/Buttons/CustomerInfoUpdateButton';
import CustomerInfoDeleteButton from '../../components/Buttons/CustomerInfoDeleteButton';


const BASE_URL = 'http://localhost:8090/info/customer';

const CustomerInfo = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    let headers = new Headers({
        'Content-Type' : 'application/json'
    });

    const accessToken = sessionStorage.getItem("USER");
    if(accessToken && accessToken !== null){
        headers.append("Authorization", "Bearer " + accessToken);
    }

    useEffect(() => {
        const fetchCustomerInfo = async () => {
            if(sessionStorage.getItem('USER') !== null){
                await fetch(BASE_URL, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        id: ''
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
    }, [navigate]);

  return (
    <div className={classes.customerInfo}>
        <div className={classes.title}>고객 정보</div>
        <div className={classes.row}> 
            <p>이름</p> 
            <p>{name}</p>
        </div>
        <div className={classes.row}>
            <p>이메일</p>
            <p>{email}</p>
        </div>
        <div className={classes.button}>
            <CustomerInfoUpdateButton />
            <CustomerInfoDeleteButton email={email} />
        </div>
    </div>
  )
}

export default CustomerInfo