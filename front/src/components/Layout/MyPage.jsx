import React from 'react'
import classes from './MyPage.module.css'
import MyStockInfo from './MyPage/MyStockInfo'
import CustomerInfo from './MyPage/CustomerInfo'
import AccountInfo from './MyPage/AccountInfo'

const MyPage = () => {
    
  return (
    <div className={classes.mypage}>
        <div className={classes.mypage__myStockInfo}>
            <MyStockInfo />
        </div>

        <div className={classes.mypage__myInfo}>
            <CustomerInfo />
            <AccountInfo />
        </div>
    </div>
  )
}

export default MyPage