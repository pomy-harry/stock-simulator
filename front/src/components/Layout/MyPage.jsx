import React from 'react'
import classes from './MyPage.module.css'
import CustomerInfo from './CustomerInfo'
import AccountInfo from './AccountInfo'

const MyPage = () => {
    
  return (
    <div className={classes.MyPage}>
        <div className={classes.MyPage__mystockinfo}>
            <div className={classes.rate}>
                현재 수익률
            </div>
            <div className={classes.stockdetail}>
                주식 잔고 상세조회
            </div>
        </div>
        <div className={classes.MyPage__myinfo}>
            <div className={classes.emptySpace}>
                빈공간
            </div>
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