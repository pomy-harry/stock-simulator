import React, { forwardRef, useEffect, useState } from 'react'
import classes from './StockBuy.module.css'
import "../../static/fonts/font.css"
import { Select, MenuItem, FormControl, Input, Button } from '@mui/material';
import NumberFormat from 'react-number-format';


// --- Input 관련 부분 -------------------------------------------------------
const NumberFormatCustom = forwardRef((props, ref) => {
    const { onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            thousandSeparator
            isNumericString
            suffix=" 주"
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value
                    }
                });
            }}
        />
    );
});
// ------------------------------------------------------------------------


const StockBuy = (props) => {

    const [buyStockName, setBuyStockName] = useState("start");
    const [buyStockPrice, setBuyStockPrice] = useState(0);
    const [buyStockAmount, setBuyStockAmount] = useState('');
    const [buyStockTotalPrice, setBuyStockTotalPrice] = useState(0)
    const [buyStockCode, setBuyStockCode] = useState('')

    const handleSelectChangeBuy = (event) => {

        setBuyStockName(event.target.value);      
        if (event.target.value !== "start") {
            const selectedWatchStock = props.watchStockList.find(stock => stock.code === event.target.value.code);
            setBuyStockPrice(parseInt(selectedWatchStock.price.replace(',', '')))
            setBuyStockCode(selectedWatchStock.code)
        } else {
            setBuyStockPrice(0)
            setBuyStockCode('')
        }       
    };

    const handleAmountChangeBuy = (event) => {
        setBuyStockAmount(event.target.value)
    };
    

    useEffect(() => {
        if (buyStockAmount === ''){
            setBuyStockTotalPrice(0)
        } else {
            setBuyStockTotalPrice(buyStockPrice*parseInt(buyStockAmount))    
        }
    }, [buyStockAmount, buyStockPrice])
    

    const findAllWatchStockByCustomerId_URL = "http://localhost:8090/stocks/watch-list";
    const accountInfo_URL = 'http://localhost:8090/info/account';

    const [watchStocks, setWatchStocks] = useState([]);
    const [myDeposit, setMyDeposit] = useState(0);
    
    let headers = new Headers({
        'Content-Type' : 'application/json'
    });

    const accessToken = sessionStorage.getItem("USER");
    if(accessToken && accessToken !== null){
        headers.append("Authorization", "Bearer " + accessToken);
    }

    useEffect(() => {  

        const fetchWatchStock = async () => {
            await fetch(findAllWatchStockByCustomerId_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                id: ''
            })
            }
            )
            .then((res) => {
            if(res.ok){
                res.json().then((res2 => {
                const dataList = [];
                for(const key in res2){
                    dataList.push({
                    code: res2[key].code,
                    name: res2[key].name                
                    });
                }
                setWatchStocks(dataList)
                }))
            } 
            });
        }
        fetchWatchStock().catch(error => {
            console.log(error);
        })

        const myDepositInfo = async() => {
            await fetch(accountInfo_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                customerId: ''
            })
            }).then((res) => {
            if(res.ok){
                res.json().then((res2 => {
                    setMyDeposit(res2.deposit);
                }))
            }
            });
        }
        myDepositInfo().catch(error => {
            console.log(error);
        })

    }, [])

    const watchStockList = watchStocks.map((value) => (
        <MenuItem value={value}>{(value.name)}</MenuItem>      
    ));





    const buyStock_URL = "http://localhost:8090/stocks/buy-stock";
    
    const buyStock = async(event) => {
        event.preventDefault();

        // 현재 한국 시간
        const nowDate = new Date();
        const utc = nowDate.getTime() + (nowDate.getTimezoneOffset() * 60 * 1000);
        const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
        const nowDateKor = new Date(utc + (KR_TIME_DIFF));
        
        const nowHour = nowDateKor.getHours();
        const nowMinutes = nowDateKor.getMinutes();
        const nowSeconds = nowDateKor.getSeconds();

        const limitStartHour = 9;
        const limitStartMinutes = 0;
        const limitStartSeconds = 0;

        const limitEndHour = 16;
        const limitEndMinutes = 0;
        const limitEndSeconds = 0;

        const nowTime = (nowHour * 3600) + (nowMinutes * 60) + nowSeconds;

        const limitStartTime = (limitStartHour * 3600) + (limitStartMinutes * 60) + limitStartSeconds;
        const limitEndTime = (limitEndHour * 3600) + (limitEndMinutes * 60) + limitEndSeconds;

        if (nowTime >= limitStartTime && nowTime <= limitEndTime) {

            if (buyStockCode !== '') {

                if (buyStockAmount !== '' &&  buyStockAmount !== 0) {

                    await fetch(buyStock_URL, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        amount: buyStockAmount,
                        stockCode: buyStockCode,
                        buyPrice : buyStockTotalPrice
                    })
                    }).then((res) => {
                    if(res.ok){
                        if (myDeposit >= buyStockTotalPrice) {
                        setBuyStockName("start");
                        setBuyStockPrice(0);
                        setBuyStockAmount('');
                        setBuyStockTotalPrice(0);
                        window.location.reload(); 
                        } else {
                        window.alert("잔액 부족.");
                        }
                    } else {
                        window.alert("가상 계좌를 생성해주세요.");
                        window.location.reload();
                    }
                    })

                } else {
                    console.log("수량 : 0");
                }

            } else {
            console.log("종목 선택 안됨");
            }

        } else {
            window.alert("거래 가능시간이 아닙니다. \n거래 가능 시간 : 09:00:00 ~ 16:00:00");
            window.location.reload();
        }
    };

  return (
    <>
        <FormControl fullWidth>
            <Select
                value={buyStockName}
                onChange={handleSelectChangeBuy}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
            >
                <MenuItem value="start">종목 선택</MenuItem>
                {watchStockList}
            </Select>
        </FormControl>

        <form>
            <div>
                <div className={classes.nowPrice}>
                    현재가격
                </div>
                <div className={classes.nowPrice__value}>
                    {buyStockPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
                </div>
            </div>
            <div>
                <Input
                    className={classes.amount}
                    placeholder='구매 수량 (주)'
                    inputComponent={NumberFormatCustom}
                    value={buyStockAmount}
                    onChange={handleAmountChangeBuy} 
                    sx={{input: {textAlign: "center"}}}            
                />
            </div>
            <div>
                <div className={classes.totalPrice}>
                    {buyStockTotalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
                </div>
            </div>
            <div>
                <div className={classes.myDeposit}>
                    내 예수금 : {myDeposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
                </div>
            </div>                        
            <Button 
                fullWidth='true'
                type='submit'
                variant='contained'
                onClick={buyStock}
            >
                구매
            </Button>
        </form>
    </>
  )
}

export default StockBuy