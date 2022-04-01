import React, { forwardRef, useEffect, useState } from 'react'
import "../../static/fonts/font.css"
import classes from './InfoTabs.module.css'
import { Tab, Tabs, Box, Typography, Select, MenuItem, FormControl, Input, Button } from '@mui/material';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import MarketInfo from './MarketInfo';

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



const InfoTabs = (props) => {
  

    const [tabValue, setTabValue] = useState(0);
    const handleInfoTabChange = (event, newTabValue) => {
      setTabValue(newTabValue);
    };

    const [buyStockName, setBuyStockName] = useState("start");
    const [buyStockPrice, setBuyStockPrice] = useState(0);
    const [buyStockAmount, setBuyStockAmount] = useState('');
    const [buyStockTotalPrice, setBuyStockTotalPrice] = useState(0)
    const [stockCode, setStockCode] = useState('')

    const handleSelectChange = (event) => {

      setBuyStockName(event.target.value);      
      if (event.target.value !== "start") {
        const selectedWatchStock = props.stockData.find(stock => stock.code === event.target.value.code);
        setBuyStockPrice(parseInt(selectedWatchStock.price.replace(',', '')))
        setStockCode(selectedWatchStock.code)  
      } else {
        setBuyStockPrice(0)
        setStockCode('')
      }       
    };

    const handleAmountChange = (event) => {
      setBuyStockAmount(event.target.value)
    };
    
    useEffect(() => {
      if (buyStockAmount === ''){
        setBuyStockTotalPrice(0)
      } else{
        setBuyStockTotalPrice(buyStockPrice*parseInt(buyStockAmount))    
      }
    })
    

    
    const findAllWatchStockByCustomerId_URL = "http://localhost:8090/stocks/findAllWatchStockByCustomerId";
    const [watchStocks, setWatchStocks] = useState([]);
    const [myDeposit, setMyDeposit] = useState(0);

    useEffect(async() => {

      await fetch(findAllWatchStockByCustomerId_URL, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
            id: sessionStorage.getItem('USER')
        })
        })
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
        })
        .then()
        .catch(error => console.error('Error:', error));

    }, []);

    const MARKET_INFO_URL = 'http://localhost:8090/marketInfo';

    const [marketInfo, setMarketInfo] = useState([{}]);

    useEffect(() => {
      const fetchMarketInfo = async () => {

        await fetch(MARKET_INFO_URL).then((res) => {
          if(res.ok){
            res.json().then((res2) => {
              setMarketInfo(res2);
            })
          }
        });       

      }
      fetchMarketInfo().catch(error => {
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


    }, [])


    const MarketInfoNews = marketInfo.map((news) => (
      <MarketInfo
        key={news.id}
        img={news.img}
        link={news.link}
        title={news.title}
        description={news.description}
      />
    ));

    const watchStockList = watchStocks.map((value) => (
      <MenuItem value={value}>{(value.name)}</MenuItem>      
    ));

    
    const accountInfo_URL = 'http://localhost:8090/info/account';
    const buyStock_URL = "http://localhost:8090/buystock";

    

    const buyStock = async(event) => {
      event.preventDefault();

      if (stockCode !== '') {

        if (buyStockAmount !== '' &&  buyStockAmount !== 0) {          

          if (myDeposit >= buyStockTotalPrice) {
            await fetch(buyStock_URL, {
              method: 'POST',
              headers: {
                  'Content-Type' : 'application/json',
              },
              body: JSON.stringify({
                  amount: buyStockAmount,
                  customerId: sessionStorage.getItem('USER'),
                  stockCode: stockCode,
                  buyPrice : buyStockTotalPrice
              })
            }).then((res) => {
              if(res.ok){
                setBuyStockName("start");
                setBuyStockPrice(0);
                setBuyStockAmount('');
                setBuyStockTotalPrice(0);
                window.location.reload();
              }else{
                window.alert("가상 계좌를 생성해주세요.");
                window.location.reload();
              }
            })

          } else {
            window.alert("잔액 부족.");
          }

        } else {
          console.log("수량 : 0");
        }


      } else {
        console.log("종목 선택 안됨");
      }

    };
    

  return (
    <div className={classes.info__tabs}>
        <Tabs value={tabValue} onChange={handleInfoTabChange}>  
                    <Tab label="모의투자" {...a11yProps(0)} className={classes.info__tabs__tab}/>
                    <Tab label="시장정보" {...a11yProps(1)}/>
                </Tabs>
                
                <TabPanel className={classes.info__tabs__tabpanel} value={tabValue} index={0}>
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
                          placeholder='          구매 수량 (주)'
                          inputComponent={NumberFormatCustom}
                          value={buyStockAmount}
                          onChange={handleAmountChange}              
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
                        onClick={buyStock}>
                          구매
                      </Button>
                    </form>
                    

                  </div>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                  {MarketInfoNews}                  
                </TabPanel>
    </div>
  )
}

export default InfoTabs