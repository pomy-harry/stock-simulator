import React, { forwardRef, useEffect, useState } from 'react'
import classes from './InfoTabs.module.css'
import { Tab, Tabs, Box, Typography, InputLabel, Select, MenuItem, FormControl, Input, Button } from '@mui/material';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

// --- Tab관련 부분 -------------------------------------------------------
const TabPanel = (props) => {

  const { children, value, index, ...other } = props;
  
  return (
    <div
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
        .then((res) => res.json())
        .then((res) => {          
          const dataList = [];
          for(const key in res){
            dataList.push({
              code: res[key].code,
              name: res[key].name
            });
          }
          setWatchStocks(dataList)
        })
        .then()
        .catch(error => console.error('Error:', error));

    }, []);

    const watchStockList = watchStocks.map((value) => (
      <MenuItem value={value}>{(value.name)}</MenuItem>      
    ));

    

    const buyStock_URL = "http://localhost:8090/buystock";

    const buyStock = async(event) => {
      event.preventDefault();

      if (stockCode !== '') {

        if (buyStockAmount !== '' &&  buyStockAmount !== 0) {

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
          })

        } else {
          console.log("수량 : 0");
        }


      } else {
        console.log("종목 선택 안됨");
      }

    };
    
    

  return (
    <div className={classes.info__tabs}>
        <Tabs value={tabValue} onChange={handleInfoTabChange} className={classes.loginModal__Tabs}>  
                    <Tab label="모의투자" {...a11yProps(0)} className={classes.loginModal__Tab} />
                    <Tab label="시장정보" {...a11yProps(1)} className={classes.loginModal__Tab} />
                </Tabs>
                
                <TabPanel value={tabValue} index={0}>
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
                        <div>
                          가격 :
                        </div>
                        <div>
                          {buyStockPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
                        </div>
                      </div>
                      <div>
                        <div>
                          수량 :
                        </div>  
                        <Input
                          placeholder='구매 수량 (주)'
                          inputComponent={NumberFormatCustom}
                          value={buyStockAmount.numberformat}
                          onChange={handleAmountChange}              
                        />
                      </div>
                      <div>
                        <div>
                          총 가격 :
                        </div>
                        <div>
                          {buyStockTotalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
                        </div>
                      </div>
                      <Button type='submit' onClick={buyStock}>구매</Button>
                    </form>
                    

                  </div>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    시장정보
                </TabPanel>
    </div>
  )
}

export default InfoTabs