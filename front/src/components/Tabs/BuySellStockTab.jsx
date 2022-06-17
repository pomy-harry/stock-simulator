import React, { forwardRef, useEffect, useState } from 'react'
import "../../static/fonts/font.css"
import classes from './BuySellStockTab.module.css'
import { Tab, Tabs, Box, Typography, Select, MenuItem, FormControl, Input, Button } from '@mui/material';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

// --- Tab관련 부분 -------------------------------------------------------
const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    
    return (
        <div
            className={classes.tab__body__news}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
  
const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};
// ------------------------------------------------------------------------

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

const BuySellStockTab = (props) => {

    

    const [tabValueBS, setTabValueBS] = useState(0);
    const handleInfoTabChangeBS = (event, newTabValue) => {
        setTabValueBS(newTabValue);
    };

    const [buyStockName, setBuyStockName] = useState("start");
    const [buyStockPrice, setBuyStockPrice] = useState(0);
    const [buyStockAmount, setBuyStockAmount] = useState('');
    const [buyStockTotalPrice, setBuyStockTotalPrice] = useState(0)
    const [buyStockCode, setBuyStockCode] = useState('')

    const [sellStockName, setSellStockName] = useState("start");
    const [sellStockPrice, setSellStockPrice] = useState(0);
    const [sellStockAmount, setSellStockAmount] = useState('');
    const [sellStockTotalPrice, setSellStockTotalPrice] = useState(0)
    const [sellStockCode, setSellStockCode] = useState('')
    const [sellStockMaxAmount, setSellStockMaxAmount] = useState(0);

    const handleSelectChange = (event) => {

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

    const handleAmountChange = (event) => {
        setBuyStockAmount(event.target.value)
    };

    const handleAmountChangeSell = (event) => {
        setSellStockAmount(event.target.value)
    };
    
    useEffect(() => {      
        if (buyStockAmount === ''){
            setBuyStockTotalPrice(0)
        } else {
            setBuyStockTotalPrice(buyStockPrice*parseInt(buyStockAmount))    
        }

        if (sellStockAmount === ''){
            setSellStockTotalPrice(0)
        } else{
            setSellStockTotalPrice(sellStockPrice*parseInt(sellStockAmount))    
        }
    })
    

    
    const findAllWatchStockByCustomerId_URL = "http://localhost:8090/stocks/watch-list";
    const accountInfo_URL = 'http://localhost:8090/info/account';
    const myStock_URL = 'http://localhost:8090/stocks/my-stock';

    const [watchStocks, setWatchStocks] = useState([]);
    const [myStocks, setMyStocks] = useState([]);
    const [myDeposit, setMyDeposit] = useState(0);


    useEffect(() => {

        const fetchWatchStock = async () => {
            await fetch(findAllWatchStockByCustomerId_URL, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                id: sessionStorage.getItem('USER')
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

        const fetchMyStock = async () => {
            await fetch(myStock_URL, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                customerId: sessionStorage.getItem('USER')
            })
            }
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
        
        const myDepositInfo = async() => {
            await fetch(accountInfo_URL, {
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
                    setMyDeposit(res2.deposit);
                }))
            }
            });
        }
        myDepositInfo().catch(error => {
            console.log(error);
        })

      

    }, []);  

    

    const watchStockList = watchStocks.map((value) => (
        <MenuItem value={value}>{(value.name)}</MenuItem>      
    ));

    const myStockList = myStocks.map((value) => (
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
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    amount: buyStockAmount,
                    customerId: sessionStorage.getItem('USER'),
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
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    sellPrice : sellStockTotalPrice,
                    amount: sellStockAmount,
                    customerId: sessionStorage.getItem('USER'),
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
        <Tabs value={tabValueBS} onChange={handleInfoTabChangeBS} className={classes.info__tabs__tabs__BS}>  
            <Tab label="매도" {...a11yProps(0)} className={classes.info__tabs__tab__BS}/>
            <Tab label="매수" {...a11yProps(1)} className={classes.info__tabs__tab__BS}/>
        </Tabs>

        <TabPanel className={classes.info__tabs__tabpanel__BS} value={tabValueBS} index={0}>
            <div>                    
                <FormControl fullWidth>
                    <Select
                        value={buyStockName}
                        onChange={handleSelectChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="start">종목 선택</MenuItem>
                        {watchStockList}
                    </Select>
                </FormControl>

                <form>
                    <div>
                        <div className={classes.info__tabs__body__price}>
                            현재가격
                        </div>
                        <div className={classes.info__tabs__body__pricevalue}>
                            {buyStockPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
                        </div>
                    </div>
                    <div>
                        <Input
                            className={classes.info__tabs__body__amount}
                            placeholder='구매 수량 (주)'
                            inputComponent={NumberFormatCustom}
                            value={buyStockAmount}
                            onChange={handleAmountChange} 
                            sx={{input: {textAlign: "center"}}}            
                        />
                    </div>
                    <div>
                        <div className={classes.info__tabs__body_totalprice}>
                            {buyStockTotalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
                        </div>
                    </div>
                    <div>
                        <div className={classes.info__tabs__body__myDeposit}>
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
            </div>
        </TabPanel>


        <TabPanel className={classes.info__tabs__tabpanel} value={tabValueBS} index={1}>
            <div>                    
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
                        <div className={classes.info__tabs__body__price}>
                            현재가격
                        </div>
                        <div className={classes.info__tabs__body__pricevalue}>
                            {sellStockPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
                        </div>
                    </div>
                    <div>
                        <Input
                            className={classes.info__tabs__body__amount}
                            placeholder='판매 수량 (주)'
                            inputComponent={NumberFormatCustom}
                            value={sellStockAmount}
                            onChange={handleAmountChangeSell} 
                            sx={{input: {textAlign: "center"}}}            
                        />
                    </div>
                    <div>
                        <div className={classes.info__tabs__body_totalprice}>
                            {sellStockTotalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
                        </div>
                    </div>
                    <div>
                        <div className={classes.info__tabs__body__myDeposit}>
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
            </div>
        </TabPanel>
    </>
    
  )
}

export default BuySellStockTab