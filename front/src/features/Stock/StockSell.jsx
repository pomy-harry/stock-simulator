import React, { forwardRef, useEffect, useState } from 'react'
import classes from './StockSell.module.css'
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


const StockSell = (props) => {

    const [sellStockName, setSellStockName] = useState("start");
    const [sellStockPrice, setSellStockPrice] = useState(0);
    const [sellStockAmount, setSellStockAmount] = useState('');
    const [sellStockTotalPrice, setSellStockTotalPrice] = useState(0)
    const [sellStockCode, setSellStockCode] = useState('')
    const [sellStockMaxAmount, setSellStockMaxAmount] = useState(0);

    const handleSelectChangeSell = (event) => {

        setSellStockName(event.target.value);      
        if (event.target.value !== "start") {
            const selectedMyStock = props.watchStockList.find(stock => stock.code === event.target.value.code);
            setSellStockPrice(parseInt(selectedMyStock.price.replace(',', '')))
            setSellStockCode(selectedMyStock.code)
            
            setSellStockMaxAmount(myStocks.find(stock => stock.code === event.target.value.code).amount); 
        } else {
            setSellStockPrice(0)
            setSellStockCode('')
            setSellStockMaxAmount(0)
        }       
    };

    const handleAmountChangeSell = (event) => {
        setSellStockAmount(event.target.value)
    };

    useEffect(() => {
        if (sellStockAmount === ''){
            setSellStockTotalPrice(0)
        } else{
            setSellStockTotalPrice(sellStockPrice*parseInt(sellStockAmount))    
        }

    }, [sellStockAmount, sellStockPrice])

    const myStock_URL = 'http://localhost:8090/stocks/my-stock';

    const [myStocks, setMyStocks] = useState([]);    

    let headers = new Headers({
        'Content-Type' : 'application/json'
    });

    const accessToken = sessionStorage.getItem("USER");
    if(accessToken && accessToken !== null){
        headers.append("Authorization", "Bearer " + accessToken);
    }

    useEffect(() => {        

        const fetchMyStock = async () => {
            await fetch(myStock_URL, {headers: headers}
            )
            .then((res) => {
            if(res.ok){
                res.json().then((res2 => {
                const myStockList = [];
                for(const key in res2){
                    myStockList.push({
                    code: res2[key].stockCode,
                    name: res2[key].name,
                    amount: res2[key].amount
                    });
                }
                setMyStocks(myStockList)
                }))
            } 
            });
        }
        fetchMyStock().catch(error => {
            console.log(error);
        })

    }, [])

    const myStockList = myStocks.map((value) => (
        <MenuItem value={value}>{(value.name)}</MenuItem>      
    ));

    const sellStock_URL = "http://localhost:8090/stocks/sell-stock";

    const sellStock = async(event) => {
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

            if (sellStockCode !== '') {
    
                if (sellStockAmount !== '' &&  sellStockAmount !== 0) {  
        
                    await fetch(sellStock_URL, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        sellPrice : sellStockTotalPrice,
                        amount: sellStockAmount,
                        stockCode: sellStockCode
                    })
                    }).then((res) => {
                    if(res.ok){
                        if (sellStockAmount <= sellStockMaxAmount) {
                        setSellStockName("start");
                        setSellStockPrice(0);
                        setSellStockAmount('');
                        setSellStockTotalPrice(0);
                        window.location.reload(); 
                        } else {
                        window.alert("판매 가능 수량을 초과했습니다.");
                        }
                    }else{
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
                value={sellStockName}
                onChange={handleSelectChangeSell}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
            >
                <MenuItem value="start">종목 선택</MenuItem>
                {myStockList}
            </Select>
        </FormControl>

        <form>
            <div>
                <div className={classes.nowPrice}>
                    현재가격
                </div>
                <div className={classes.nowPrice__value}>
                    {sellStockPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
                </div>
            </div>
            <div>
                <Input
                    className={classes.amount}
                    placeholder='판매 수량 (주)'
                    inputComponent={NumberFormatCustom}
                    value={sellStockAmount}
                    onChange={handleAmountChangeSell} 
                    sx={{input: {textAlign: "center"}}}            
                />
            </div>
            <div>
                <div className={classes.totalPrice}>
                    {sellStockTotalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
                </div>
            </div>
            <div>
                <div className={classes.myDeposit}>
                    판매 가능 수량 : {sellStockMaxAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 주
                </div>
            </div>                        
            <Button 
                fullWidth='true'
                type='submit'
                variant='contained'
                onClick={sellStock}
            >
                판매
            </Button>
        </form>
    </>
  )
}

export default StockSell