import React from 'react'
import classes from './MyPage.module.css'
import CustomerInfo from './CustomerInfo'
import AccountInfo from './AccountInfo'
import MyStockInfo from './MyStockInfo'

const MyPage = () => {
    
  return (
    <div className={classes.MyPage}>
        <div className={classes.MyPage__mystockinfo}>
            <MyStockInfo />
        </div>
        <div className={classes.MyPage__myinfo}>
            <div className={classes.customerinfo}>
                <CustomerInfo />
            </div>
            <div className={classes.stockinfo}>
                <AccountInfo />
            </div>
        </div>
    </div>
  )
}

export default MyPage