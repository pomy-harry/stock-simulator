import React from 'react'
import { useEffect, useState } from 'react';

const BASE_URL = 'http://localhost:8090/info/customer';

const CustomerInfo = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const fetchCustomerInfo = async () => {
            await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    id: "4028811d7fd4db27017fd4db6fb70000"
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
        }

        fetchCustomerInfo().catch(error => {
            console.log(error);
        })
    }, []);

  return (
    <>
        <div>고객정보</div>
        <div>
            <div>이름</div> 
            <div>{name}</div>
        </div>
        <div>
            <div>이메일</div>
            <div>{email}</div>
        </div>
    </>
  )
}

export default CustomerInfo