import React from 'react'
import classes from "./Main.module.css";
import { Button} from '@mui/material';
import StockList from './ComboBox';
import InfoTabs from '../Commons/InfoTabs';

const Main = () => {

  return (
    <div className={classes.main}>

      <div className={classes.chart}>
        <form className={classes.chart__search}>
            {/* <Input className={classes.chart__search__input} placeholder="검색" type='text' /> */}
            <StockList className={classes.chart__search__input}></StockList>
            <Button className={classes.chart__search__button1}>버튼1</Button>
            <Button className={classes.chart__search__button2}>버튼2</Button>
        </form>
        <div className={classes.chart__list}>
          {/* 맵함수 이용하면 될듯... */}
          <div className={classes.chart__list_one}>
            차트1
          </div>

          <div className={classes.chart__list_one}>
            차트2
          </div>

          <div className={classes.chart__list_one}>
            차트3
          </div>
        </div>
      </div>


      <div className={classes.info}>
        <div className={classes.info__myinfo}>
          내 주식 정보
        </div>

        <InfoTabs />
      </div>

    </div>
    
  )
}

export default Main