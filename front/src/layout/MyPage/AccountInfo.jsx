import React, { useEffect, useState } from 'react'
import classes from './AccountInfo.module.css'
import AccountInfoCreateButton from '../../components/Buttons/AccountCreateButton';
import AccountInfoUpdateButton from '../../components/Buttons/AccountUpdateButton';
import AccountInfoDeleteButton from '../../components/Buttons/AccountDeleteButton';

const BASE_URL = 'http://localhost:8090/info/account';

const AccountInfo = () => {

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [deposit, setDeposit] = useState(0);
    const [balance, setBalance] = useState(0);

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
                        console.log(res2.id);
                        setId(res2.id);
                        setName(res2.name);
                        setDeposit(res2.deposit);
                        setBalance(res2.sumTotalNowPrice + res2.deposit);
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
        {(name === null) ? (
            <div className={classes.accountInfo}>
                <div className={classes.no__account}>
                    <p>계좌 정보가 없습니다.</p>
                </div>
                <div className={classes.button}>
                    <AccountInfoCreateButton />
                </div>
            </div>
        ):(
            // <ShowAccount id={id} name={name} deposit={deposit} balance={balance}/>
            <div className={classes.accountInfo}>
                <div className={classes.title}> 계좌정보</div>
                <div className={classes.row}>
                    <p>계좌 이름</p> 
                    <p>{name}</p>
                </div>
                <div className={classes.row}>
                    <p>예수금</p>
                    <p>{deposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</p>
                </div>
                <div className={classes.row}> 
                    <p>잔고</p>
                    <p>{balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') } 원</p>
                </div>
                <div className={classes.button}>
                    <AccountInfoUpdateButton id={id} name={name} />
                    <AccountInfoDeleteButton id={id} name={name} />
                </div>
            </div>
        )}
    </>
  )
}

export default AccountInfo