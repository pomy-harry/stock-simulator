import React from 'react'
import classes from './MyPage.module.css'
import CustomerInfo from './CustomerInfo'
import AccountInfo from './AccountInfo'
import MyStockInfo from './MyStockInfo'

const MyPage = () => {
    
  return (
    <div className={classes.mypage}>
        <div className={classes.mypage__mystockinfo}>
            <MyStockInfo />
        </div>
        <div className={classes.mypage__myinfo}>
            <div className={classes.customer__info}>
                <CustomerInfo />
            </div>
            <div className={classes.stock__info}>
                <AccountInfo />
            </div>
        </div>
    </div>
  )
}

export default MyPage