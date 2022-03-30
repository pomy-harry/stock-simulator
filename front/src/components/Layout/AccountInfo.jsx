import React from 'react'
import { useEffect, useState } from 'react';
import CreateAccount from '../Commons/CreateAccount'
import ShowAccount from '../Commons/ShowAccount';

const BASE_URL = 'http://localhost:8090/info/account';

const AccountInfo = () => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [deposit, setDeposit] = useState("");
    const [balance, setBalance] = useState("");

    useEffect(() => {
        const fetchCustomerInfo = async () => {
            await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    customerId: sessionStorage.getItem('USER')
                })
            }).then((res) => {
                if(res.ok){
                    res.json().then((res2 => {
                        console.log(res2.name);
                        setId(res2.id);
                        setName(res2.name);
                        setDeposit(res2.deposit);
                        setBalance("0000");
                    }))
                }
            })
        }

        fetchCustomerInfo().catch(error => {
            console.log(error);
        })
    }, []);

    
    return (name === null) ? 
        <CreateAccount /> : <ShowAccount id={id} name={name} deposit={deposit} balance={balance}/>
    
}

export default AccountInfo