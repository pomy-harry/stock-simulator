import React from 'react'
import classes from "./Main.module.css";
import { Button, Input } from '@mui/material';

const Main = () => {

  return (
    <div className={classes.main}>

      <div className={classes.chart}>
        <form className={classes.chart__search}>
            <Input className={classes.chart__search__input} placeholder="검색" type='text' />
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

        <div className={classes.info__tabs}>
          시장정보, 모의투자 탭 만들기 스크롤 가능하게 하기
        </div>
      </div>

    </div>
    
  )
}

export default Main