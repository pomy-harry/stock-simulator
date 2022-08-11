import React, { useEffect, useState } from 'react'
import classes from './MarketInfoShowInfo.module.css'
import "../../static/fonts/font.css"
import MarketInfoShowNaverFinanceMainNewsOne from './MarketInfoShowNaverFinanceMainNewsOne';

const MarketInfoShowInfo = () => {

    const MARKET_INFO_URL = 'http://localhost:8090/market-info';
    const [marketInfo, setMarketInfo] = useState([{}]);

    let headers = new Headers({
        'Content-Type' : 'application/json'
      });
    
      const accessToken = sessionStorage.getItem("USER");
      if(accessToken && accessToken !== null){
          headers.append("Authorization", "Bearer " + accessToken);
      } 

    useEffect(() => {
    
        const fetchMarketInfo = async () => {
            await fetch(MARKET_INFO_URL, {headers: headers}).then((res) => {
            if(res.ok){
                res.json().then((res2) => {
                setMarketInfo(res2);
                console.log(res2);
                })
            }
            });       

        }
        fetchMarketInfo().catch(error => {
            console.log(error);
        })

    }, []);  

    const NaverFinanceMainNewsList = marketInfo.map((news) => (
        <MarketInfoShowNaverFinanceMainNewsOne
            key={news.id}
            img={news.img}
            link={news.link}
            title={news.title}
            description={news.description}
        />
    ));
    
  return (
    <div className={classes.mainNews}>
        <p>주요 뉴스</p>
        {NaverFinanceMainNewsList}
    </div>
  )
}

export default MarketInfoShowInfo